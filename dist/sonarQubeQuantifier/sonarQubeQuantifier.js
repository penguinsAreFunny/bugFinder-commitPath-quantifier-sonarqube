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
var TYPES_1 = require("../TYPES");
var sonarQubeMeasurement_1 = require("./sonarQubeMeasurement");
var moment_1 = __importDefault(require("moment"));
var SonarQubeQuantifier = /** @class */ (function () {
    function SonarQubeQuantifier() {
    }
    SonarQubeQuantifier.prototype.quantify = function (localities) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var hashes, commits, _loop_1, localities_1, localities_1_1, locality, quantifications, i;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        /**
                         * merge all CommitPaths which are in the same commit
                         * performance optimization
                         * git checkout and SonarQube-quantification is costly therefore only run this process once
                         * for each commit
                         */
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("SonarQubeQuantifier starting...");
                        hashes = new Map();
                        commits = [];
                        _loop_1 = function (locality) {
                            if (hashes.get(locality.commit.hash) === 1)
                                return "continue";
                            hashes.set(locality.commit.hash, 1);
                            var commitPaths = localities.filter(function (loc) {
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
                            for (localities_1 = __values(localities), localities_1_1 = localities_1.next(); !localities_1_1.done; localities_1_1 = localities_1.next()) {
                                locality = localities_1_1.value;
                                _loop_1(locality);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (localities_1_1 && !localities_1_1.done && (_d = localities_1.return)) _d.call(localities_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Total commits: " + commits.length);
                        i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(i < commits.length)) return [3 /*break*/, 4];
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("Quantifying commit " + (i + 1) + " of " + commits.length);
                        return [4 /*yield*/, this.quantifyCommit(commits, i, quantifications)];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, quantifications];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.quantifyCommit = function (commits, i, quantifications) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var commit, beforeCheckout, err_1, afterCheckout, beforePreHooks, afterPreHooks, beforeSonarQube, measurements, afterSonarQube, parsedMeasurements, preHooksTime, checkoutTime, sonarQubeTime, totalTime, estimatedTimeS, estimatedTimeM, estimatedTimeH, estimatedTimeD;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        commit = commits[i];
                        beforeCheckout = (0, moment_1.default)();
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkoutCommit(commit.hash)];
                    case 2:
                        _j.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _j.sent();
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(err_1.message);
                        return [2 /*return*/];
                    case 4:
                        afterCheckout = (0, moment_1.default)();
                        beforePreHooks = (0, moment_1.default)();
                        try {
                            this.runPreHooks();
                        }
                        catch (error) {
                            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.error("SonarQubeQuantifier: Prehooks failed for commit " + commit.hash + " with error: " +
                                (error.message + ". Aborting quantification of commit."), error);
                            return [2 /*return*/];
                        }
                        afterPreHooks = (0, moment_1.default)();
                        beforeSonarQube = (0, moment_1.default)();
                        return [4 /*yield*/, this.sonarQubeQuantify(commit.paths, commit.hash)];
                    case 5:
                        measurements = _j.sent();
                        afterSonarQube = (0, moment_1.default)();
                        if (measurements.length != commit.localities.length) {
                            (_c = this.logger) === null || _c === void 0 ? void 0 : _c.error("ERROR: SonarQubeQuantifier failed for commit " + commit.hash + ".");
                            return [2 /*return*/];
                        }
                        parsedMeasurements = [];
                        commit.localities.forEach(function (locality, x) {
                            var parsedMeasurement = undefined;
                            if (measurements[x] != null) {
                                parsedMeasurement = new sonarQubeMeasurement_1.SonarQubeMeasurement(measurements[x]);
                                parsedMeasurements.push(parsedMeasurement);
                            }
                            quantifications.set(locality, parsedMeasurement);
                        });
                        preHooksTime = afterPreHooks.diff(beforePreHooks, "seconds");
                        checkoutTime = afterCheckout.diff(beforeCheckout, "seconds");
                        sonarQubeTime = afterSonarQube.diff(beforeSonarQube, "seconds");
                        totalTime = preHooksTime + checkoutTime + sonarQubeTime;
                        estimatedTimeS = totalTime * (commits.length - i);
                        estimatedTimeM = Math.round((estimatedTimeS / 60) * 100) / 100;
                        estimatedTimeH = Math.round((estimatedTimeS / (60 * 60)) * 100) / 100;
                        estimatedTimeD = Math.round((estimatedTimeS / (60 * 60 * 24)) * 100) / 100;
                        (_d = this.logger) === null || _d === void 0 ? void 0 : _d.info("\tPrehooks time:\t" + preHooksTime);
                        (_e = this.logger) === null || _e === void 0 ? void 0 : _e.info("\tCheckout time:\t" + checkoutTime);
                        (_f = this.logger) === null || _f === void 0 ? void 0 : _f.info("\tSonarQube time:\t" + sonarQubeTime);
                        (_g = this.logger) === null || _g === void 0 ? void 0 : _g.info("\tTotal time:\t" + totalTime);
                        (_h = this.logger) === null || _h === void 0 ? void 0 : _h.info("\tEstimated time for next " + (commits.length - i) + " commits: with " +
                            totalTime + "s time per commit: " + estimatedTimeS + "s = " + estimatedTimeM + "m = " +
                            estimatedTimeH + "h  = " + estimatedTimeD + "d\n\n");
                        // @formatter:on
                        return [2 /*return*/, parsedMeasurements];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.runPreHooks = function () {
        var _this = this;
        if (this.sonarQubeConfig.preHooks) {
            this.sonarQubeConfig.preHooks.forEach(function (hook, index) {
                var _a;
                try {
                    hook();
                }
                catch (error) {
                    (_a = _this.logger) === null || _a === void 0 ? void 0 : _a.error("Error: Failed hook number " + index + ". Error was: " + error.message, error);
                }
            });
        }
    };
    SonarQubeQuantifier.prototype.checkoutCommit = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2, err2_1, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.git.checkout(hash, true)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        err_2 = _a.sent();
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
                        err2_1 = _a.sent();
                        msg = "SonarQubeQuantifier: git checkout retry failed with msg: " + err2_1 + "." +
                            (" Aborting quantification for commit " + hash);
                        throw new Error(msg);
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.sonarQubeQuantify = function (paths, commitHash) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var runSonarScanner, webServerIsUpdated, retrieveMeasurements, waitUntilWebserverIsUpdated, timeBeforeScanning, beforeScanning, afterScanning, error_1, beforeRetrieving, measurements, paths_1, paths_1_1, path, measurement, error_2, e_2_1, afterRetrieving;
            var e_2, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        runSonarScanner = function () {
                            var _a, _b, _c;
                            // @formatter:off
                            var args = "-Dproject.settings=" + _this.sonarQubeConfig.propertiesPath;
                            var command = "sonar-scanner.bat " + args;
                            (_a = _this.logger) === null || _a === void 0 ? void 0 : _a.info(command + "\n\n");
                            (_b = _this.logger) === null || _b === void 0 ? void 0 : _b.info("\tScanning might take a few minutes: Command: ", command);
                            (0, child_process_1.execSync)(command).toString();
                            (_c = _this.logger) === null || _c === void 0 ? void 0 : _c.info("\tFinished scan");
                            //@formatter:on
                        };
                        webServerIsUpdated = function (time) { return __awaiter(_this, void 0, void 0, function () {
                            var config, response, tasks, newestTask, newestTaskTime, error_3;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
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
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios(config)];
                                    case 2:
                                        response = _c.sent();
                                        tasks = (_a = response.data) === null || _a === void 0 ? void 0 : _a.tasks;
                                        if (tasks.length <= 0) {
                                            return [2 /*return*/, false];
                                        }
                                        newestTask = tasks[0];
                                        newestTaskTime = Date.parse(newestTask.startedAt);
                                        return [2 /*return*/, newestTask.status == "SUCCESS" && newestTaskTime >= time];
                                    case 3:
                                        error_3 = _c.sent();
                                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.warn("\tHttp GET to SonarQube-WebApi with path: \"api/ce/activity\" failed with error: \n                    " + error_3.statusCode + ". Error message: " + error_3.message + ". CommitHash: " + commitHash);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        retrieveMeasurements = function (path) { return __awaiter(_this, void 0, void 0, function () {
                            var properties, sonarProjectKey, metricsUrlString, webPath, config, response, error_4, msg;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
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
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios(config)];
                                    case 2:
                                        response = _b.sent();
                                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("\tSuccessfully retrieved measurements for path: " + webPath);
                                        return [2 /*return*/, response.data];
                                    case 3:
                                        error_4 = _b.sent();
                                        msg = "\"\tFailed to retrieve measurements from sonarQubeServer for path " + webPath + "." +
                                            ("Error message: " + error_4.message);
                                        throw new Error(msg);
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        waitUntilWebserverIsUpdated = function (timeBeforeScanning2) { return __awaiter(_this, void 0, void 0, function () {
                            var now, minutesWaiting;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, webServerIsUpdated(timeBeforeScanning2)];
                                    case 1:
                                        if (!!(_a.sent())) return [3 /*break*/, 3];
                                        now = Date.now().valueOf();
                                        minutesWaiting = (now - timeBeforeScanning2.valueOf()) / (1000 * 60);
                                        if (minutesWaiting > 15)
                                            throw new Error("Timeout: SonarQube-Webserver has not updated for 15 minutes. Commit " + commitHash);
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
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, waitUntilWebserverIsUpdated(timeBeforeScanning)];
                    case 2:
                        _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _f.sent();
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(error_1);
                        return [2 /*return*/, null];
                    case 4:
                        beforeRetrieving = (0, moment_1.default)();
                        measurements = [];
                        _f.label = 5;
                    case 5:
                        _f.trys.push([5, 12, 13, 14]);
                        paths_1 = __values(paths), paths_1_1 = paths_1.next();
                        _f.label = 6;
                    case 6:
                        if (!!paths_1_1.done) return [3 /*break*/, 11];
                        path = paths_1_1.value;
                        _f.label = 7;
                    case 7:
                        _f.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, retrieveMeasurements(path)];
                    case 8:
                        measurement = _f.sent();
                        measurements.push(measurement);
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _f.sent();
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.error("Error: Retrieving of measurements for commit: ", commitHash, " for path: ", path, "\n\tMessage: ", error_2.message);
                        return [3 /*break*/, 10];
                    case 10:
                        paths_1_1 = paths_1.next();
                        return [3 /*break*/, 6];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_2_1 = _f.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (paths_1_1 && !paths_1_1.done && (_e = paths_1.return)) _e.call(paths_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        afterRetrieving = (0, moment_1.default)();
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("\tScanning time: " + afterScanning.diff(beforeScanning, "seconds"));
                        (_d = this.logger) === null || _d === void 0 ? void 0 : _d.info("\tRetrieving time: " + afterRetrieving.diff(beforeRetrieving, "seconds"));
                        return [2 /*return*/, measurements];
                }
            });
        });
    };
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.logger),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "logger", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.sonarQubeConfig),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "sonarQubeConfig", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.git),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "git", void 0);
    SonarQubeQuantifier = __decorate([
        (0, inversify_1.injectable)()
    ], SonarQubeQuantifier);
    return SonarQubeQuantifier;
}());
exports.SonarQubeQuantifier = SonarQubeQuantifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb25hclF1YmVRdWFudGlmaWVyL3NvbmFyUXViZVF1YW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFDdkQsK0NBQXVDO0FBRXZDLHVEQUFxRDtBQUVyRCw4REFBOEQ7QUFDOUQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLDhEQUE4RDtBQUM5RCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3RELDJEQUE0RDtBQUU1RCxrQ0FBeUU7QUFFekUsK0RBQTREO0FBQzVELGtEQUE0QjtBQUk1QjtJQUFBO0lBc1FBLENBQUM7SUE1UFMsc0NBQVEsR0FBZCxVQUFlLFVBQXdCOzs7Ozs7Ozt3QkFDbkM7Ozs7OzJCQUtHO3dCQUNILE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUE7d0JBQzlDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQzt3QkFDckMsT0FBTyxHQUFrRSxFQUFFLENBQUE7NENBRXBFLFFBQVE7NEJBQ2YsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztrREFBVzs0QkFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFFcEMsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7Z0NBQ3JDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxJ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