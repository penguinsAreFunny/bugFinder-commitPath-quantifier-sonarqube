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
            var locs, hashes, commits, _loop_1, locs_1, locs_1_1, locality, quantifications, commitsLength, _loop_2, this_1, i;
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
                        commitsLength = commits.length;
                        _loop_2 = function (i) {
                            var commit, beforePreHooks, afterPreHooks, beforeCheckout, afterCheckout, beforeSonarQube, measurements, afterSonarQube, preHooksTime, checkoutTime, sonarQubeTime, totalTime, estimatedTimeS, estimatedTimeM, estimatedTimeH, estimatedTimeD;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        commit = commits[i];
                                        console.log("Quantifying commit " + (i + 1) + " of " + commits.length + ". Hash: " + commit.hash);
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
                                            var parsedMeasurement = new SonarQubeMeasurement_1.SonarQubeMeasurement(measurements[i]);
                                            console.log("PARSEDMEASUREMENT: ", parsedMeasurement);
                                            process.exit();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zb25hclF1YmVRdWFudGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELCtDQUF1QztBQUV2Qyx1REFBcUQ7QUFFckQsOERBQThEO0FBQzlELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQiw4REFBOEQ7QUFDOUQsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN0RCwyREFBNEQ7QUFDNUQsK0ZBQWdGO0FBQ2hGLGlDQUF3RTtBQUN4RSx1RkFBMEU7QUFDMUUsK0RBQTREO0FBQzVELGtEQUE0QjtBQUc1QjtJQUFBO0lBNlJBLENBQUM7SUFsUlMsc0NBQVEsR0FBZCxVQUFlLFVBQXdCOzs7Ozs7O3dCQUNuQzs7Ozs7MkJBS0c7d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO3dCQUN4QyxJQUFJLEdBQWlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFeEQsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO3dCQUNuQyxPQUFPLEdBQWtFLEVBQUUsQ0FBQTs0Q0FDdEUsUUFBUTs0QkFDZixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2tEQUFXOzRCQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUVwQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRztnQ0FDL0IsT0FBTyxHQUFHLENBQUMs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