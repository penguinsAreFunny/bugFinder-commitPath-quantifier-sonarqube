import { LocalityPreprocessor } from "bugfinder-framework";
import { CommitPath, PathsHandling } from "bugfinder-localityrecorder-commitpath";
import { Logger } from "ts-log";
export declare class CommitSubset implements LocalityPreprocessor<CommitPath> {
    logger: Logger;
    pathsHandling: PathsHandling;
    skip: number;
    n: number;
    /**
     * All removed CommitPaths with reason why they have been removed
     * @private
     */
    private removedCommitPaths;
    /**
     * Returns the CommitPaths of the n Commits after the Skip commit
     * @param localities
     */
    preprocess(localities: CommitPath[]): Promise<CommitPath[]>;
    private setCommitPaths;
    applyPathHandling(localities: CommitPath[]): CommitPath[];
}
