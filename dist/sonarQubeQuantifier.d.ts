import { SonarQubeConfig } from "./sonarQubeConfig";
import { LocalityMap, Quantifier } from "bugfinder-framework";
import { CommitPath, PathsHandling } from "bugfinder-localityrecorder-commitpath";
import { Git } from "bugfinder-localityrecorder-commit";
import { SonarQubeMeasurement } from "./SonarQubeMeasurement";
export declare class SonarQubeQuantifier implements Quantifier<CommitPath, SonarQubeMeasurement> {
    sonarQubeConfig: SonarQubeConfig;
    git: Git;
    pathsHandling: PathsHandling;
    quantify(localities: CommitPath[]): Promise<LocalityMap<CommitPath, SonarQubeMeasurement>>;
    private runPreHooks;
    private checkoutCommit;
    private sonarQubeQuantify;
    applyPathHandling(localities: CommitPath[]): CommitPath[];
}
