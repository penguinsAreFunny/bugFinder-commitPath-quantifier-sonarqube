import {inject, injectable} from "inversify";
import {execSync} from "child_process";
import {AxiosRequestConfig} from "axios";
import {SONARQUBE_METRICS} from "./sonarQubeMetrics";
import {SonarQubeConfig} from "./sonarQubeConfig";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const propertiesReader = require("properties-reader");
import {LocalityMap, Quantifier} from "bugfinder-framework";
import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES} from "../TYPES";
import {Git, GitFileType, Commit} from "bugfinder-localityrecorder-commit"
import {SonarQubeMeasurement} from "./sonarQubeMeasurement";
import moment from "moment";

@injectable()
export class SonarQubeQuantifier implements Quantifier<CommitPath, SonarQubeMeasurement> {

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.sonarQubeConfig)
    sonarQubeConfig: SonarQubeConfig;

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.git)
    git: Git;

    async quantify(localities: CommitPath[]): Promise<LocalityMap<CommitPath, SonarQubeMeasurement>> {
        /**
         * merge all CommitPaths which are in the same commit
         * performance optimization
         * git checkout and SonarQube-quantification is costly therefore only run this process once
         * for each commit
         */
        console.log("SonarQubeQuantifier starting...")
        const hashes = new Map<string, number>();
        let commits: { hash: string, localities: CommitPath[], paths: string[] }[] = []
        for (const locality of localities) {
            if (hashes.get(locality.commit.hash) === 1) continue;
            hashes.set(locality.commit.hash, 1);

            const commitPaths = localities.filter(loc => {
                return loc.commit.hash === locality.commit.hash
            })

            const paths = commitPaths.map(commitPath => {
                return commitPath.path?.path
            })

            commits.push({
                hash: locality.commit.hash,
                localities: commitPaths,
                paths: paths
            });
        }

        const quantifications = new LocalityMap<CommitPath, SonarQubeMeasurement>();

        // TODO: Total commits und Total commits with paths to quantify sollte inzwischen identisch sein!
        console.log("Total commits: ", commits.length)
        const commitsLeft = commits.filter(commit => {
            return commit.paths.length > 0 && commit.paths[0] != undefined
        })
        const commitsLength = commitsLeft.length
        console.log("Total commits with paths to quantify: ", commitsLength)

        for (let i = 0; i < commitsLength; i++) {
            const commit = commits[i];
            console.log(`Quantifying commit ${i + 1} of ${commits.length}. Hash: ${commit.hash}`);

            if (commit.paths.length == 0 || commit.paths[0] == undefined) {
                console.log("ignoring commit as no paths are left to quantify for this commit. If you like",
                    "to inject on empty paths see pathsHandling-injections")
                continue
            }

            const beforePreHooks = moment();
            this.runPreHooks();
            const afterPreHooks = moment();

            const beforeCheckout = moment();
            await this.checkoutCommit(commit.hash);
            const afterCheckout = moment();

            const beforeSonarQube = moment();
            const measurements = await this.sonarQubeQuantify(commit.paths);
            const afterSonarQube = moment();

            if (measurements.length != commit.localities.length) {
                console.error(`ERROR: SonarQubeQuantifier failed for commit ${commit.hash}.`);
                continue;
            }

            commit.localities.forEach((locality, x) => {
                let parsedMeasurement = undefined;
                if (measurements[x] != null) {
                    parsedMeasurement = new SonarQubeMeasurement(measurements[x])
                }
                quantifications.set(locality, parsedMeasurement);
            })

            // @formatter:off
            const preHooksTime  = afterPreHooks.diff(beforePreHooks, "seconds")
            const checkoutTime  = afterCheckout.diff(beforeCheckout, "seconds")
            const sonarQubeTime = afterSonarQube.diff(beforeSonarQube, "seconds")
            const totalTime     = preHooksTime + checkoutTime + sonarQubeTime
            const estimatedTimeS = totalTime * (commitsLength-i);
            const estimatedTimeM = Math.round((estimatedTimeS/60)*100)/100;
            const estimatedTimeH = Math.round((estimatedTimeS/(60*60))*100)/100;
            const estimatedTimeD = Math.round((estimatedTimeS/(60*60*24))*100)/100;
            console.log("\tPrehooks time:\t",    preHooksTime);
            console.log("\tCheckout time:\t",    checkoutTime);
            console.log("\tSonarQube time:\t",   sonarQubeTime);
            console.log("\tTotal time:\t",       totalTime);
            console.log("\tEstimated time for next ", commitsLength-i, " commits: with ", totalTime,
                "s time per commit: ", estimatedTimeS , "s = ", estimatedTimeM, "m = ", estimatedTimeH, "h  = ",
                estimatedTimeD, "d");
            console.log("\n\n\n")
            // @formatter:on

        }

        return quantifications;
    }

    private runPreHooks() {
        if (this.sonarQubeConfig.preHooks) {
            this.sonarQubeConfig.preHooks.forEach((hook: () => void) => {
                hook();
            });
        }
    }

    private async checkoutCommit(hash: string) {
        try {
            await this.git.checkout(hash, true);
        } catch (err) {
            try {
                // retry
                await this.git.checkout(hash, true);
            } catch (err2) {
                throw new Error(`SonarQubeQuantifier: git checkout retry failed with msg: ${err2}.` +
                    ` Aborting quantification for commit ${hash}`);
            }
        }
    }

    private async sonarQubeQuantify(paths: string[]) {
        const runSonarScanner = () => {
            // @formatter:off
            const args      = `-Dproject.settings=${this.sonarQubeConfig.propertiesPath}`;
            const command   = `sonar-scanner.bat ${args}`
            console.log(command)
            console.log("\n\n")
            console.log("\tScanning might take a few minutes: Command: ", command);
            execSync(command).toString();
            console.log("\tFinished scan");
            //@formatter:on
        };

        const webServerIsUpdated: (time: number) => Promise<boolean> = async (time: number) => {

            const config: AxiosRequestConfig = {
                baseURL: this.sonarQubeConfig.sonarQubeURL,
                url: "api/ce/activity",
                // using base64 auth
                auth: {
                    username: this.sonarQubeConfig.id,
                    password: this.sonarQubeConfig.pw,
                }
            }

            try {
                const response = await axios(config);
                const tasks = response.data?.tasks;
                if (tasks.length <= 0) {
                    return false;
                }

                const newestTask = tasks[0];
                const newestTaskTime = Date.parse(newestTask.startedAt);
                return newestTask.status == "SUCCESS" && newestTaskTime >= time;
            } catch (error) {
                console.log(`\tHttp GET to SonarQube-WebApi with path: "api/ce/activity" failed with error: 
                    ${error.statusCode}. Error message: ${error.message}`);
            }
        };

        const retrieveMeasurements = async (path: string) => {
            if (path == null) return null;
            // @formatter:off
            const properties        = propertiesReader(this.sonarQubeConfig.propertiesPath);
            const sonarProjectKey   = properties.get("sonar.projectKey");
            const metricsUrlString  = SONARQUBE_METRICS.join("%2C");
            const webPath           = path.split("/").join("%2F");// / muss mit %2F ersetzt werden
            // @formatter:on

            const config: AxiosRequestConfig = {
                baseURL: this.sonarQubeConfig.sonarQubeURL,
                //url: "/api/measures/component?component=" + sonarProjectKey + "&metricKeys=" +
                //    metricsUrlString,
                url: "/api/measures/component?component=" + sonarProjectKey + "%3A" + webPath + "&metricKeys=" +
                    metricsUrlString,
                // using base64 auth
                auth: {
                    username: this.sonarQubeConfig.id,
                    password: this.sonarQubeConfig.pw,
                }
            }

            try {
                const response = await axios(config);
                console.log(`\tSuccessfully retrieved measurements for path: ${webPath}`);
                return response.data;
            } catch (error) {
                const msg = `"\tFailed to retrieve measurements from sonarQubeServer for path ${webPath}.` +
                    `Error message: ${error.message}`
                throw new Error(msg);
            }
        }

        const waitUntilWebserverIsUpdated = async (timeBeforeScanning) => {
            // activePolling: waiting until webServerIsUpdated
            // eslint-disable-next-line no-empty
            while (!await webServerIsUpdated(timeBeforeScanning)) {
                const now = Date.now().valueOf()
                const minutesWaiting = (now - timeBeforeScanning.valueOf()) / (1000 * 60)
                if (minutesWaiting > 15) throw new Error("Timeout: SonarQube-Webserver has not updated for 15 minutes");

                // sleep 1000ms
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        const timeBeforeScanning = Date.now();
        const beforeScanning = moment();
        runSonarScanner();
        const afterScanning = moment();
        try {
            await waitUntilWebserverIsUpdated(timeBeforeScanning);
        } catch (error) {
            console.log(error);
            return null;
        }

        const beforeRetrieving = moment();
        const measurements = [];
        for (const path of paths) {
            try {
                const measurement = await retrieveMeasurements(path)
                measurements.push(measurement);
            } catch (error) {
                console.log("Error: Retrieving of measurements for path: ", path, "\nMessage: ", error.message);
            }
        }
        const afterRetrieving = moment();

        console.log("\tScanning time: ", afterScanning.diff(beforeScanning, "seconds"));
        console.log("\tRetrieving time: ", afterRetrieving.diff(beforeRetrieving, "seconds"));

        return measurements;
    }

}