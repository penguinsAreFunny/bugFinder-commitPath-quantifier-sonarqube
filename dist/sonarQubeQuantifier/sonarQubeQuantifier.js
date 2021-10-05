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
        return __awaiter(this, void 0, void 0, function () {
            var hashes, commits, _loop_1, localities_1, localities_1_1, locality, quantifications, i;
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
                        this.logger.info("SonarQubeQuantifier starting...");
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
                                if (localities_1_1 && !localities_1_1.done && (_a = localities_1.return)) _a.call(localities_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        this.logger.info("Total commits: ", commits.length);
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < commits.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.quantifyCommit(commits, i, quantifications)];
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
    SonarQubeQuantifier.prototype.quantifyCommit = function (commits, i, quantifications) {
        return __awaiter(this, void 0, void 0, function () {
            var commit, beforeCheckout, err_1, afterCheckout, beforePreHooks, afterPreHooks, beforeSonarQube, measurements, afterSonarQube, preHooksTime, checkoutTime, sonarQubeTime, totalTime, estimatedTimeS, estimatedTimeM, estimatedTimeH, estimatedTimeD;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commit = commits[i];
                        beforeCheckout = (0, moment_1.default)();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkoutCommit(commit.hash)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.logger.error(err_1.message);
                        return [2 /*return*/];
                    case 4:
                        afterCheckout = (0, moment_1.default)();
                        beforePreHooks = (0, moment_1.default)();
                        try {
                            this.runPreHooks();
                        }
                        catch (error) {
                            this.logger.error("SonarQubeQuantifier: Prehooks failed for commit " + commit.hash + " with error: " +
                                (error.message + ". Aborting quantification of commit."), error);
                            return [2 /*return*/];
                        }
                        afterPreHooks = (0, moment_1.default)();
                        beforeSonarQube = (0, moment_1.default)();
                        return [4 /*yield*/, this.sonarQubeQuantify(commit.paths, commit.hash)];
                    case 5:
                        measurements = _a.sent();
                        afterSonarQube = (0, moment_1.default)();
                        if (measurements.length != commit.localities.length) {
                            this.logger.error("ERROR: SonarQubeQuantifier failed for commit " + commit.hash + ".");
                            return [2 /*return*/];
                        }
                        commit.localities.forEach(function (locality, x) {
                            var parsedMeasurement = undefined;
                            if (measurements[x] != null) {
                                parsedMeasurement = new sonarQubeMeasurement_1.SonarQubeMeasurement(measurements[x]);
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
                        this.logger.info("\tPrehooks time:\t", preHooksTime);
                        this.logger.info("\tCheckout time:\t", checkoutTime);
                        this.logger.info("\tSonarQube time:\t", sonarQubeTime);
                        this.logger.info("\tTotal time:\t", totalTime);
                        this.logger.info("\tEstimated time for next " + (commits.length - i) + " commits: with " +
                            totalTime + "s time per commit: " + estimatedTimeS + "s = " + estimatedTimeM + "m = " +
                            estimatedTimeH + "h  = " + estimatedTimeD + "d");
                        this.logger.info("\n\n\n");
                        return [2 /*return*/];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.runPreHooks = function () {
        var _this = this;
        if (this.sonarQubeConfig.preHooks) {
            this.sonarQubeConfig.preHooks.forEach(function (hook, index) {
                try {
                    hook();
                }
                catch (error) {
                    _this.logger.error("Error: Failed hook number " + index + ". Error was: " + error.message, error);
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
                            _this.logger.info(command);
                            _this.logger.info("\n\n");
                            _this.logger.info("\tScanning might take a few minutes: Command: ", command);
                            (0, child_process_1.execSync)(command).toString();
                            _this.logger.info("\tFinished scan");
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
                                        this.logger.warn("\tHttp GET to SonarQube-WebApi with path: \"api/ce/activity\" failed with error: \n                    " + error_3.statusCode + ". Error message: " + error_3.message + ". CommitHash: " + commitHash);
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
                                        this.logger.info("\tSuccessfully retrieved measurements for path: " + webPath);
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
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, waitUntilWebserverIsUpdated(timeBeforeScanning)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        this.logger.error(error_1);
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
                        this.logger.error("Error: Retrieving of measurements for commit: ", commitHash, " for path: ", path, "\n\tMessage: ", error_2.message);
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
                        this.logger.info("\tScanning time: ", afterScanning.diff(beforeScanning, "seconds"));
                        this.logger.info("\tRetrieving time: ", afterRetrieving.diff(beforeRetrieving, "seconds"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb25hclF1YmVRdWFudGlmaWVyL3NvbmFyUXViZVF1YW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFDdkQsK0NBQXVDO0FBRXZDLHVEQUFxRDtBQUVyRCw4REFBOEQ7QUFDOUQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLDhEQUE4RDtBQUM5RCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3RELDJEQUE0RDtBQUU1RCxrQ0FBeUU7QUFFekUsK0RBQTREO0FBQzVELGtEQUE0QjtBQUk1QjtJQUFBO0lBa1FBLENBQUM7SUF4UFMsc0NBQVEsR0FBZCxVQUFlLFVBQXdCOzs7Ozs7O3dCQUNuQzs7Ozs7MkJBS0c7d0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQTt3QkFDN0MsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO3dCQUNyQyxPQUFPLEdBQWtFLEVBQUUsQ0FBQTs0Q0FFcEUsUUFBUTs0QkFDZixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2tEQUFXOzRCQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUVwQyxJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRztnQ0FDckMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FB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