import {inject, injectable, optional} from "inversify";
import {execSync} from "child_process";
import {AxiosRequestConfig} from "axios";
import {SONARQUBE_METRICS} from "./sonarQubeMetrics";
import {SonarQubeConfig} from "./sonarQubeConfig";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const propertiesReader = require("properties-reader");
import {LocalityMap, Quantifier, SHARED_TYPES} from "bugfinder-framework";
import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES} from "../TYPES";
import {Git} from "bugfinder-localityrecorder-commit"
import {SonarQubeMeasurement} from "./sonarQubeMeasurement";
import moment from "moment";
import {Logger} from "ts-log";


// TODO: Cache hinzufügen! Wieso? Cache kann jedes mal, wenn Messungen erzeugt werden gefüllt werden (update DB,
//  ohne Duplikate) Dadurch muss bei Abbrüchen die Stelle nicht erneut Quantifiziert werden!
@injectable()
export class SonarQubeQuantifier implements Quantifier<CommitPath, SonarQubeMeasurement> {
    @optional() @inject(SHARED_TYPES.logger)
    logger: Logger

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
        this.logger?.info("SonarQubeQuantifier starting...")
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
        this.logger?.info("Total commits: " + commits.length)

        // quantifying each commit
        for (let i = 0; i < commits.length; i++) {
            this.logger?.info(`Quantifying commit ${i + 1} of ${commits.length}`)
            await this.quantifyCommit(commits, i, quantifications)
        }

        return quantifications;
    }

    public async quantifyCommit(commits: { hash: string, localities: CommitPath[], paths: string[] }[], i: number,
                                quantifications: LocalityMap<CommitPath, SonarQubeMeasurement>)
        : Promise<SonarQubeMeasurement[]> {

        const commit = commits[i]

        const beforeCheckout = moment();
        try {
            await this.checkoutCommit(commit.hash);
        } catch (err) {
            this.logger?.error(err.message)
            return
        }
        const afterCheckout = moment();

        const beforePreHooks = moment();
        try {
            this.runPreHooks();
        } catch (error) {
            this.logger?.error(`SonarQubeQuantifier: Prehooks failed for commit ${commit.hash} with error: ` +
                `${error.message}. Aborting quantification of commit.`, error)
            return
        }
        const afterPreHooks = moment();

        const beforeSonarQube = moment();
        const measurements = await this.sonarQubeQuantify(commit.paths, commit.hash);
        const afterSonarQube = moment();

        if (measurements.length != commit.localities.length) {
            this.logger?.error(`SonarQubeQuantifier failed for commit ${commit.hash}.`);
            return
        }

        let parsedMeasurements: SonarQubeMeasurement[] = []
        commit.localities.forEach((locality, x) => {
            let parsedMeasurement = undefined;
            if (measurements[x] != null) {
                parsedMeasurement = new SonarQubeMeasurement(measurements[x])
                parsedMeasurements.push(parsedMeasurement)
            }
            quantifications.set(locality, parsedMeasurement);
        })

        // @formatter:off
        const preHooksTime  = afterPreHooks.diff(beforePreHooks, "seconds")
        const checkoutTime  = afterCheckout.diff(beforeCheckout, "seconds")
        const sonarQubeTime = afterSonarQube.diff(beforeSonarQube, "seconds")
        const totalTime     = preHooksTime + checkoutTime + sonarQubeTime
        const estimatedTimeS = totalTime * (commits.length-i);
        const estimatedTimeM = Math.round((estimatedTimeS/60)*100)/100;
        const estimatedTimeH = Math.round((estimatedTimeS/(60*60))*100)/100;
        const estimatedTimeD = Math.round((estimatedTimeS/(60*60*24))*100)/100;
        this.logger?.info("Prehooks time:\t\t" +    preHooksTime);
        this.logger?.info("Checkout time:\t\t" +    checkoutTime);
        this.logger?.info("SonarQube time:\t\t" +   sonarQubeTime);
        this.logger?.info("Total time:\t\t" +       totalTime);
        this.logger?.info("Estimated time for next " + (commits.length-i) + " commits: with " +
            totalTime + "s time per commit: " +  estimatedTimeS + "s = " + estimatedTimeM + "m = " +
            estimatedTimeH + "h  = " + estimatedTimeD + "d\n\n");
        // @formatter:on

        return parsedMeasurements
    }

    private runPreHooks() {
        if (this.sonarQubeConfig.preHooks) {
            this.sonarQubeConfig.preHooks.forEach((hook: () => void, index) => {
                try {
                    hook();
                } catch (error) {
                    this.logger?.error(`Failed hook number ${index}. Error was: ${error.message}`, error)
                }
            })
        }
    }

    private async checkoutCommit(hash: string) {
        // TypeScript failed bei Commit: 1a2de721b597f087f0fcf91937fa972b010dc647 whyyy???
        try {
            await this.git.checkout(hash, true);
        } catch (err) {
            try {
                // retry
                await this.git.checkout(hash, true);
            } catch (err2) {
                const msg = `SonarQubeQuantifier: git checkout retry failed with msg: ${err2}.` +
                    ` Aborting quantification for commit ${hash}`
                throw new Error(msg);
            }
        }
    }

    private async sonarQubeQuantify(paths: string[], commitHash: string) {
        const runSonarScanner = () => {
            // @formatter:off
            const args      = `-Dproject.settings=${this.sonarQubeConfig.propertiesPath}`;
            const command   = `sonar-scanner.bat ${args}`
            this.logger?.info(command)
            this.logger?.info("Scanning might take a few minutes: Command: " + command);
            execSync(command).toString();
            this.logger?.info("Finished scan");
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
                this.logger?.warn(`Http GET to SonarQube-WebApi with path: "api/ce/activity" failed with error: 
                    ${error.statusCode}. Error message: ${error.message}. CommitHash: ${commitHash}`);
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
                this.logger?.info(`Successfully retrieved measurements for path: ${webPath}`);
                return response.data;
            } catch (error) {
                const msg = `"Failed to retrieve measurements from sonarQubeServer for path ${webPath}.` +
                    `Error message: ${error.message}`
                throw new Error(msg);
            }
        }

        const waitUntilWebserverIsUpdated = async (timeBeforeScanning2) => {
            // activePolling: waiting until webServerIsUpdated
            // eslint-disable-next-line no-empty
            while (!await webServerIsUpdated(timeBeforeScanning2)) {
                const now = Date.now().valueOf()
                const minutesWaiting = (now - timeBeforeScanning2.valueOf()) / (1000 * 60)
                if (minutesWaiting > 15)
                    throw new Error(`Timeout: SonarQube-Webserver has not updated for 15 minutes. Commit ${commitHash}`);

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
            this.logger?.error(error);
            return null;
        }

        const beforeRetrieving = moment();
        const measurements = [];
        for (const path of paths) {
            try {
                const measurement = await retrieveMeasurements(path)
                measurements.push(measurement);
            } catch (error) {
                this.logger?.error("Error: Retrieving of measurements for commit: " + commitHash +
                    " for path: " + path + "\n\tMessage: " + error.message);
            }
        }
        const afterRetrieving = moment();

        this.logger?.info("Scanning time:\t\t" + afterScanning.diff(beforeScanning, "seconds"));
        this.logger?.info("Retrieving time:\t" +  afterRetrieving.diff(beforeRetrieving, "seconds"));

        return measurements;
    }

}