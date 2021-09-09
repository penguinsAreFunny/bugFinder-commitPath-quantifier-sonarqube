"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SonarQubeQuantifier = void 0;
var inversify_1 = require("inversify");
var child_process_1 = require("child_process");
var sonarQubeMetrics_1 = require("./sonarQubeMetrics");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var propertiesReader = require("properties-reader");
var bugfinder_framework_1 = require("bugfinder-framework");
var bugfinder_localityrecorder_commitpath_1 = require("bugfinder-localityrecorder-commitpath");
var TYPES_1 = require("./TYPES");
var bugfinder_localityrecorder_commit_1 = require("bugfinder-localityrecorder-commit");
var SonarQubeMeasurement_1 = require("./SonarQubeMeasurement");
var moment_1 = __importDefault(require("moment"));
var SonarQubeQuantifier = /** @class */ (function () {
    function SonarQubeQuantifier() {
    }
    SonarQubeQuantifier.prototype.quantify = function (localities) {
        return __awaiter(this, void 0, void 0, function () {
            var locs, hashes, commits, _loop_1, locs_1, locs_1_1, locality, quantifications, commitsLeft, commitsLength, _loop_2, this_1, i;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        /**
                         * merge all CommitPaths which are in the same commit
                         * performance optimization
                         * git checkout and SonarQube-quantification is costly therefore only run this process once
                         * for each commit
                         */
                        console.log("SonarQubeQuantifier starting...");
                        locs = this.applyPathHandling(localities);
                        hashes = new Map();
                        commits = [];
                        _loop_1 = function (locality) {
                            if (hashes.get(locality.commit.hash) === 1)
                                return "continue";
                            hashes.set(locality.commit.hash, 1);
                            var commitPaths = locs.filter(function (loc) {
                                return loc.commit.hash === locality.commit.hash;
                            });
                            var paths = commitPaths.map(function (commitPath) {
                                var _a;
                                return (_a = commitPath.path) === null || _a === void 0 ? void 0 : _a.path;
                            });
                            commits.push({
                                hash: locality.commit.hash,
                                localities: commitPaths,
                                paths: paths
                            });
                        };
                        try {
                            for (locs_1 = __values(locs), locs_1_1 = locs_1.next(); !locs_1_1.done; locs_1_1 = locs_1.next()) {
                                locality = locs_1_1.value;
                                _loop_1(locality);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (locs_1_1 && !locs_1_1.done && (_a = locs_1.return)) _a.call(locs_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        console.log("Total commits left: ", commits.length);
                        commitsLeft = commits.filter(function (commit) {
                            return commit.paths.length > 0 && commit.paths[0] != undefined;
                        });
                        commitsLength = commitsLeft.length;
                        console.log("Total commits with paths to quantify: ", commitsLength);
                        _loop_2 = function (i) {
                            var commit, beforePreHooks, afterPreHooks, beforeCheckout, afterCheckout, beforeSonarQube, measurements, afterSonarQube, preHooksTime, checkoutTime, sonarQubeTime, totalTime, estimatedTimeS, estimatedTimeM, estimatedTimeH, estimatedTimeD;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        commit = commits[i];
                                        console.log("Quantifying commit " + (i + 1) + " of " + commits.length + ". Hash: " + commit.hash);
                                        if (commit.paths.length == 0 || commit.paths[0] == undefined) {
                                            console.log("ignoring commit as no paths are left to quantify for this commit. If you like", "to inject on empty paths see pathsHandling-injections");
                                            return [2 /*return*/, "continue"];
                                        }
                                        beforePreHooks = (0, moment_1.default)();
                                        this_1.runPreHooks();
                                        afterPreHooks = (0, moment_1.default)();
                                        beforeCheckout = (0, moment_1.default)();
                                        return [4 /*yield*/, this_1.checkoutCommit(commit.hash)];
                                    case 1:
                                        _c.sent();
                                        afterCheckout = (0, moment_1.default)();
                                        beforeSonarQube = (0, moment_1.default)();
                                        return [4 /*yield*/, this_1.sonarQubeQuantify(commit.paths)];
                                    case 2:
                                        measurements = _c.sent();
                                        afterSonarQube = (0, moment_1.default)();
                                        if (measurements.length != commit.localities.length) {
                                            console.error("ERROR: SonarQubeQuantifier failed for commit " + commit.hash + ".");
                                            return [2 /*return*/, "continue"];
                                        }
                                        commit.localities.forEach(function (locality, i) {
                                            var parsedMeasurement = undefined;
                                            if (measurements[i] != null) {
                                                parsedMeasurement = new SonarQubeMeasurement_1.SonarQubeMeasurement(measurements[i]);
                                            }
                                            quantifications.set(locality, parsedMeasurement);
                                        });
                                        preHooksTime = afterPreHooks.diff(beforePreHooks, "seconds");
                                        checkoutTime = afterCheckout.diff(beforeCheckout, "seconds");
                                        sonarQubeTime = afterSonarQube.diff(beforeSonarQube, "seconds");
                                        totalTime = preHooksTime + checkoutTime + sonarQubeTime;
                                        estimatedTimeS = totalTime * (commitsLength - i);
                                        estimatedTimeM = Math.round((estimatedTimeS / 60) * 100) / 100;
                                        estimatedTimeH = Math.round((estimatedTimeS / (60 * 60)) * 100) / 100;
                                        estimatedTimeD = Math.round((estimatedTimeS / (60 * 60 * 24)) * 100) / 100;
                                        console.log("\tPrehooks time:\t", preHooksTime);
                                        console.log("\tCheckout time:\t", checkoutTime);
                                        console.log("\tSonarQube time:\t", sonarQubeTime);
                                        console.log("\tTotal time:\t", totalTime);
                                        console.log("\tEstimated time for next ", commitsLength - i, " commits: with ", totalTime, "s time per commit: ", estimatedTimeS, "s = ", estimatedTimeM, "m = ", estimatedTimeH, "h  = ", estimatedTimeD, "d");
                                        console.log("\n\n\n");
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < commitsLength)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, quantifications];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.runPreHooks = function () {
        if (this.sonarQubeConfig.preHooks) {
            this.sonarQubeConfig.preHooks.forEach(function (hook) {
                hook();
            });
        }
    };
    SonarQubeQuantifier.prototype.checkoutCommit = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.git.checkout(hash, true)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        err_1 = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        // retry
                        return [4 /*yield*/, this.git.checkout(hash, true)];
                    case 4:
                        // retry
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        throw new Error("SonarQubeQuantifier: git checkout retry failed with msg: " + err_2 + "." +
                            (" Aborting quantification for commit " + hash));
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.sonarQubeQuantify = function (paths) {
        return __awaiter(this, void 0, void 0, function () {
            var runSonarScanner, webServerIsUpdated, retrieveMeasurements, waitUntilWebserverIsUpdated, timeBeforeScanning, beforeScanning, afterScanning, error_1, beforeRetrieving, measurements, paths_1, paths_1_1, path, measurement, error_2, e_2_1, afterRetrieving;
            var e_2, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        runSonarScanner = function () {
                            // @formatter:off
                            var args = "-Dproject.settings=" + _this.sonarQubeConfig.propertiesPath;
                            var command = "sonar-scanner.bat " + args;
                            console.log(command);
                            console.log("\n\n");
                            console.log("\tScanning might take a few minutes: Command: ", command);
                            var stdout = (0, child_process_1.execSync)(command).toString();
                            console.log("\tFinished scan");
                            //@formatter:on
                        };
                        webServerIsUpdated = function (time) { return __awaiter(_this, void 0, void 0, function () {
                            var config, response, tasks, newestTask, newestTaskTime, error_3;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        config = {
                                            baseURL: this.sonarQubeConfig.sonarQubeURL,
                                            url: "api/ce/activity",
                                            // using base64 auth
                                            auth: {
                                                username: this.sonarQubeConfig.id,
                                                password: this.sonarQubeConfig.pw,
                                            }
                                        };
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios(config)];
                                    case 2:
                                        response = _b.sent();
                                        tasks = (_a = response.data) === null || _a === void 0 ? void 0 : _a.tasks;
                                        if (tasks.length <= 0) {
                                            return [2 /*return*/, false];
                                        }
                                        newestTask = tasks[0];
                                        newestTaskTime = Date.parse(newestTask.startedAt);
                                        return [2 /*return*/, newestTask.status == "SUCCESS" && newestTaskTime >= time];
                                    case 3:
                                        error_3 = _b.sent();
                                        console.log("\tHttp GET to SonarQube-WebApi with path: \"api/ce/activity\" failed with error: \n                    " + error_3.statusCode + ". Error message: " + error_3.message);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        retrieveMeasurements = function (path) { return __awaiter(_this, void 0, void 0, function () {
                            var properties, sonarProjectKey, metricsUrlString, webPath, config, response, error_4, msg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (path == null)
                                            return [2 /*return*/, null];
                                        properties = propertiesReader(this.sonarQubeConfig.propertiesPath);
                                        sonarProjectKey = properties.get("sonar.projectKey");
                                        metricsUrlString = sonarQubeMetrics_1.SONARQUBE_METRICS.join("%2C");
                                        webPath = path.split("/").join("%2F");
                                        config = {
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
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios(config)];
                                    case 2:
                                        response = _a.sent();
                                        console.log("\tSuccessfully retrieved measurements for path: " + webPath);
                                        return [2 /*return*/, response.data];
                                    case 3:
                                        error_4 = _a.sent();
                                        msg = "\"\tFailed to retrieve measurements from sonarQubeServer for path " + webPath + "." +
                                            ("Error message: " + error_4.message);
                                        throw new Error(msg);
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        waitUntilWebserverIsUpdated = function (timeBeforeScanning) { return __awaiter(_this, void 0, void 0, function () {
                            var now, minutesWaiting;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, webServerIsUpdated(timeBeforeScanning)];
                                    case 1:
                                        if (!!(_a.sent())) return [3 /*break*/, 3];
                                        now = Date.now().valueOf();
                                        minutesWaiting = (now - timeBeforeScanning.valueOf()) / (1000 * 60);
                                        if (minutesWaiting > 15)
                                            throw new Error("Timeout: SonarQube-Webserver has not updated for 15 minutes");
                                        // sleep 1000ms
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                                    case 2:
                                        // sleep 1000ms
                                        _a.sent();
                                        return [3 /*break*/, 0];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        timeBeforeScanning = Date.now();
                        beforeScanning = (0, moment_1.default)();
                        runSonarScanner();
                        afterScanning = (0, moment_1.default)();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, waitUntilWebserverIsUpdated(timeBeforeScanning)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, null];
                    case 4:
                        beforeRetrieving = (0, moment_1.default)();
                        measurements = [];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 12, 13, 14]);
                        paths_1 = __values(paths), paths_1_1 = paths_1.next();
                        _b.label = 6;
                    case 6:
                        if (!!paths_1_1.done) return [3 /*break*/, 11];
                        path = paths_1_1.value;
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, retrieveMeasurements(path)];
                    case 8:
                        measurement = _b.sent();
                        measurements.push(measurement);
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _b.sent();
                        console.log("Error: Retrieving of measurements for path: ", path, "\nMessage: ", error_2.message);
                        return [3 /*break*/, 10];
                    case 10:
                        paths_1_1 = paths_1.next();
                        return [3 /*break*/, 6];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        afterRetrieving = (0, moment_1.default)();
                        console.log("\tScanning time: ", afterScanning.diff(beforeScanning, "seconds"));
                        console.log("\tRetrieving time: ", afterRetrieving.diff(beforeRetrieving, "seconds"));
                        return [2 /*return*/, measurements];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.applyPathHandling = function (localities) {
        var _this = this;
        console.log("Applying path handling for " + localities.length + " localities.");
        var commits = bugfinder_localityrecorder_commitpath_1.CommitPath.getCommits(localities);
        // pathsHandling: filter commitPath which do not comply the pathIncludes pattern
        var filterPathIncludes = function (commitPath) {
            //if (commitPath.path) return this.pathsHandling.pathIncludes.test(commitPath.path.path);
            if (commitPath.path)
                return _this.pathsHandling.pathIncludes.test(commitPath.path.path);
            return true;
        };
        if (this.pathsHandling && this.pathsHandling.pathIncludes) {
            localities = localities.filter(filterPathIncludes);
            console.log("localities after filtering pathIncludes: ", localities.length);
        }
        // remove paths which are deleted
        var removeDeletedPaths = function (commitPath) {
            if (commitPath.path)
                return commitPath.path.type !== bugfinder_localityrecorder_commit_1.GitFileType.deleted;
            return true;
        };
        localities = localities.filter(removeDeletedPaths);
        console.log("localities after removing deleted paths: ", localities.length);
        var localityMap = new Map();
        localities.forEach(function (l) {
            localityMap.set(l.commit.hash, l);
        });
        // inject paths for each unique commit
        commits.forEach(function (commit) {
            var _a, _b, _c;
            var commitPath = localityMap.get(commit.hash);
            if (commitPath == null || (commitPath.path == null && !((_a = _this.pathsHandling) === null || _a === void 0 ? void 0 : _a.injectOnEmptyPaths))) {
                // do not inject on empty paths
                return;
            }
            (_c = (_b = _this.pathsHandling) === null || _b === void 0 ? void 0 : _b.injections) === null || _c === void 0 ? void 0 : _c.forEach(function (injection) {
                var injectedCommitPath = new bugfinder_localityrecorder_commitpath_1.CommitPath();
                injectedCommitPath.commit = commit;
                injectedCommitPath.path = {
                    path: injection,
                    type: bugfinder_localityrecorder_commit_1.GitFileType.other
                };
                localities.push(injectedCommitPath);
                localityMap.set(commit.hash, injectedCommitPath);
            });
        });
        console.log("localities after injecting pathInjections: ", localities.length);
        console.log("CommitPathType got " + localities.length + " localities from " + commits.length + " commits.");
        return localities;
    };
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.sonarQubeConfig),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "sonarQubeConfig", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.git),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "git", void 0);
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.pathsHandling),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "pathsHandling", void 0);
    SonarQubeQuantifier = __decorate([
        (0, inversify_1.injectable)()
    ], SonarQubeQuantifier);
    return SonarQubeQuantifier;
}());
exports.SonarQubeQuantifier = SonarQubeQuantifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zb25hclF1YmVRdWFudGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELCtDQUF1QztBQUV2Qyx1REFBcUQ7QUFFckQsOERBQThEO0FBQzlELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQiw4REFBOEQ7QUFDOUQsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN0RCwyREFBNEQ7QUFDNUQsK0ZBQWdGO0FBQ2hGLGlDQUF3RTtBQUN4RSx1RkFBMEU7QUFDMUUsK0RBQTREO0FBQzVELGtEQUE0QjtBQUc1QjtJQUFBO0lBOFNBLENBQUM7SUFuU1Msc0NBQVEsR0FBZCxVQUFlLFVBQXdCOzs7Ozs7O3dCQUNuQzs7Ozs7MkJBS0c7d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO3dCQUN4QyxJQUFJLEdBQWlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFeEQsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO3dCQUNyQyxPQUFPLEdBQWtFLEVBQUUsQ0FBQTs0Q0FDcEUsUUFBUTs0QkFDZixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2tEQUFXOzRCQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUVwQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRztnQ0FDL0IsT0FBTyxHQUFHLENBQUMs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