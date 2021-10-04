# Description
This package is used as a Quantifier for CommitPaths of the machine learning pipeline of the
[bugfinder-framework](https://github.com/penguinsAreFunny/bugFinder-framework#readme) or 
([npm:bugfinder-framework](https://www.npmjs.com/package/bugfinder-framework)). 
You can use SonarQube as a Quantifier to quantify your localities of type CommitPath.
You can define prehooks wich are executed directly after commit checkout.

# Prerequisites
You need to begin with understanding the [bugfinder-framework](https://github.com/penguinsAreFunny/bugFinder-framework#readme)
and installing it:
1. 
        npm i bugfinder-framework
2. [SonarQube](https://www.sonarqube.org/) installed

        used version: 9.0.1
3. SonarQube server started 
4. SonarQube-Webinterface: Project created
5. [Git](https://git-scm.com/) installed. 
        
        used version: 2.28.0
 
    
# Usage
    npm i -D bugfinder-commitpath-quantifier-sonarqube
    
This package is not intended to be used independently, but feel free to do so.
Here is an example quantifying TypeScript-Files of npm projects. Reading and writing localities from a
MongoDB. You can create your localities with [bugfinder-localityrecorder-commitpath](https://www.npmjs.com/package/bugfinder-localityrecorder-commitpath).
inversify.config.ts
```
import {MongoDBConfig} from "bugfinder-commit-db-mongodb";
import {
    DB, FileAndConsoleLogger, LogConfig, QuantificationFactory, Quantifier, QUANTIFIER_TYPES, SHARED_TYPES,
} from "bugfinder-framework";
import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {BUGFINDER_DB_COMMITPATH_MONGODB_TYPES, CommitPathsMongoDB} from "bugfinder-commitpath-db-mongodb";
import {
    BUGFINDER_LOCALITYRECORDER_COMMIT_TYPES,
    FormatParser,
    GitImpl, Git, GitOptions, 
    MADFilesFromCommit, MADFilesFromLogImpl
} from "bugfinder-localityrecorder-commit";
import {execSync} from "child_process";
import {
    BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES,
    SonarQubeConfig,
    SonarQubeMeasurement,
    SonarQubeQuantifier
} from "bugfinder-commitpath-quantifier-sonarqube";
import {Logger} from "ts-log";
import {quantifierContainer} from "bugfinder-framework-defaultcontainer";

const container = quantifierContainer;

const projectRoot: string = "../repositories/TypeScript"
const propertiesPath: string = "./typescript.properties"

const typescriptPreHook: () => void = () => {
    execSync("npm install", {cwd: projectRoot});
}

const hooks: (() => void)[] = [
    typescriptPreHook
];

const sonarQubeConfig: SonarQubeConfig = {
    propertiesPath: propertiesPath,
    sonarQubeURL: "http://localhost:9000/",
    id: "admin",
    pw: "sonarqubepassword",
    preHooks: hooks
}
const mongoDBConfig: MongoDBConfig = {
    url: "mongodb://localhost:27017",
    dbName: "TEST"
}

// binding quantifier and its dependencies
container.bind<Quantifier<CommitPath, SonarQubeMeasurement>>(QUANTIFIER_TYPES.quantifier)
    .to(SonarQubeQuantifier)
container.bind<SonarQubeConfig>(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.sonarQubeConfig)
    .toConstantValue(sonarQubeConfig);
container.bind<Logger>(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.logger).to(FileAndConsoleLogger)
container.bind<LogConfig>(SHARED_TYPES.logConfig).toConstantValue(logOptions)

// binding Git and its dependencies
container.bind<Git>(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.git).to(GitImpl)
container.bind<MADFilesFromCommit>(BUGFINDER_LOCALITYRECORDER_COMMIT_TYPES.madFilesFromCommitParser)
    .to(MADFilesFromLogImpl);
container.bind<FormatParser>(BUGFINDER_LOCALITYRECORDER_COMMIT_TYPES.gitCommitParser)
    .to(FormatParser);
container.bind<GitOptions>(BUGFINDER_LOCALITYRECORDER_COMMIT_TYPES.gitOptions)
    .toConstantValue(gitOptions);

// binding DB and its dependencies
container.bind<DB<CommitPath, any, SonarQubeMeasurement>>(QUANTIFIER_TYPES.db)
    .to(CommitPathsMongoDB)
container.bind<MongoDBConfig>(BUGFINDER_DB_COMMITPATH_MONGODB_TYPES.mongoDBConfig)
    .toConstantValue(mongoDBConfig)

// binding QuantificationFactory
container.bind<QuantificationFactory<CommitPath, any>>(QUANTIFIER_TYPES.quantificationFactory)
    .to(QuantificationFactory)

export {container}
```
main.ts
```
import "reflect-metadata";
import {container} from "./inversify.config"
import {DB, QuantificationFactory, QUANTIFIER_TYPES} from "bugfinder-framework";
import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {SonarQubeMeasurement} from "bugfinder-commitpath-quantifier-sonarqube";

async function topLevelAwaitWrapper() {
        const factory = container.get<QuantificationFactory<CommitPath, SonarQubeMeasurement>>(
            QUANTIFIER_TYPES.quantificationFactory)
        const db = factory.createDB()
        const quantifier = factory.createQuantifier()

        const locs = await db.read("CommitPaths")
        const quantifications = quantifier.quantify(locs)
        db.writeQuantifications(quantifications, "Quantifications")
}

topLevelAwaitWrapper();
```
typescript.properties
```
# must be unique in a given SonarQube instance
sonar.projectKey=TypeScript
sonar.login=4d8211474b328a6e5fed0ee503923aa31474b38d # your login. This key will be created on project creation via SonarQube Webserver
sonar.host.url=http://localhost:9000


# Path is relative to the sonar-project.properties file. Defaults to .
sonar.projectBaseDir=../repositories/TypeScript
# Path is relative to projectBaseDir
sonar.sources=src
sonar.log.level=DEBUG

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8
sonar.javascript.node.maxspace=8192
sonar.javascript.maxFileSize=100000
#sonar.exclusions=node_modules/**,src/environments/**,**/*.spec.ts,dist/**,**/docs/**,**/*.js,e2e/**,coverage/**,TLH-distributions/**,src/bsb-theme/css/**
#sonar.ts.tslint.configPath=tslint.json
#sonar.typescript.lcov.reportPaths=coverage/lcov.info
```
