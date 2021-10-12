"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measure = exports.SonarQubeMeasurement = exports.SonarQubeMeasures = void 0;
var SonarQubeMeasures = /** @class */ (function () {
    function SonarQubeMeasures() {
        this.cognitiveComplexity = new Measure();
        this.duplicatedLinesDensity = new Measure();
        this.securityRating = new Measure();
        this.blockerViolations = new Measure();
        this.duplicatedBlocks = new Measure();
        this.vulnerabilities = new Measure();
        this.classes = new Measure();
        this.securityReviewRating = new Measure();
        this.functions = new Measure();
        this.sqaleIndex = new Measure();
        this.bugs = new Measure();
        this.infoViolations = new Measure();
        this.coverage = new Measure();
        this.generatedNcloc = new Measure();
        this.lines = new Measure();
        this.ncloc = new Measure();
        this.generatedLines = new Measure();
        this.linesToCover = new Measure();
        this.reopenedIssues = new Measure();
        this.confirmedIssues = new Measure();
        this.testSuccessDensity = new Measure();
        this.securityHotspots = new Measure();
        this.majorViolations = new Measure();
        this.violations = new Measure();
        this.uncoveredLines = new Measure();
        this.minorViolations = new Measure();
        this.criticalViolations = new Measure();
        this.falsePositiveIssues = new Measure();
        this.statements = new Measure();
        this.testFailures = new Measure();
        this.duplicatedFiles = new Measure();
        this.reliabilityRemediationEffort = new Measure();
        this.commentLinesDensity = new Measure();
        this.lineCoverage = new Measure();
        this.sqaleDebtRatio = new Measure();
        this.sqaleRating = new Measure();
        this.reliabilityRating = new Measure();
        this.files = new Measure();
        this.wontFixIssues = new Measure();
        this.skippedTests = new Measure();
        this.codeSmells = new Measure();
        this.effortToReachMaintainabilityRatingA = new Measure();
        this.complexity = new Measure();
        this.commentLines = new Measure();
        this.duplicatedLines = new Measure();
        this.securityRemediationEffort = new Measure();
        this.openIssues = new Measure();
        this.testErrors = new Measure();
    }
    return SonarQubeMeasures;
}());
exports.SonarQubeMeasures = SonarQubeMeasures;
/**
 * This class is dependent on SonarQube version 9.0.1
 */
var SonarQubeMeasurement = /** @class */ (function () {
    /**
     * Generates a SonarQubeMeasurements out of the response from the
     * SonarQube-webserver
     * @param response
     */
    function SonarQubeMeasurement(response) {
        this.measures = new SonarQubeMeasures();
        if (response == undefined) {
            return;
        }
        var component = response.component;
        var measures = component.measures;
        this.qualifier = component.qualifier;
        this.language = component.language;
        this.parseByRefNumber("cognitive_complexity", this.measures.cognitiveComplexity, measures);
        this.parseByRefNumber("duplicated_lines_density", this.measures.duplicatedLinesDensity, measures);
        this.parseByRefNumber("security_rating", this.measures.securityRating, measures);
        this.parseByRefNumber("blocker_violations", this.measures.blockerViolations, measures);
        this.parseByRefNumber("duplicated_blocks", this.measures.duplicatedBlocks, measures);
        this.parseByRefNumber("vulnerabilities", this.measures.vulnerabilities, measures);
        this.parseByRefNumber("classes", this.measures.classes, measures);
        this.parseByRefNumber("security_review_rating", this.measures.securityReviewRating, measures);
        this.parseByRefNumber("functions", this.measures.functions, measures);
        this.parseByRefNumber("sqale_index", this.measures.sqaleIndex, measures);
        this.parseByRefNumber("bugs", this.measures.bugs, measures);
        this.parseByRefNumber("info_violations", this.measures.infoViolations, measures);
        this.parseByRefNumber("coverage", this.measures.coverage, measures);
        this.parseByRefNumber("generated_ncloc", this.measures.generatedNcloc, measures);
        this.parseByRefNumber("lines", this.measures.lines, measures);
        this.parseByRefNumber("ncloc", this.measures.ncloc, measures);
        this.parseByRefNumber("generated_lines", this.measures.generatedLines, measures);
        this.parseByRefNumber("lines_to_cover", this.measures.linesToCover, measures);
        this.parseByRefNumber("reopened_issues", this.measures.reopenedIssues, measures);
        this.parseByRefNumber("confirmed_issues", this.measures.confirmedIssues, measures);
        this.parseByRefNumber("test_success_density", this.measures.testSuccessDensity, measures);
        this.parseByRefNumber("security_hotspots", this.measures.securityHotspots, measures);
        this.parseByRefNumber("major_violations", this.measures.majorViolations, measures);
        this.parseByRefNumber("violations", this.measures.violations, measures);
        this.parseByRefNumber("uncovered_lines", this.measures.uncoveredLines, measures);
        this.parseByRefNumber("minor_violations", this.measures.minorViolations, measures);
        this.parseByRefNumber("critical_violations", this.measures.criticalViolations, measures);
        this.parseByRefNumber("false_positive_issues", this.measures.falsePositiveIssues, measures);
        this.parseByRefNumber("statements", this.measures.statements, measures);
        this.parseByRefNumber("test_failures", this.measures.testFailures, measures);
        this.parseByRefNumber("duplicated_files", this.measures.duplicatedFiles, measures);
        this.parseByRefNumber("reliability_remediation_effort", this.measures.reliabilityRemediationEffort, measures);
        this.parseByRefNumber("comment_lines_density", this.measures.commentLines, measures);
        this.parseByRefNumber("line_coverage", this.measures.lineCoverage, measures);
        this.parseByRefNumber("sqale_debt_ratio", this.measures.sqaleDebtRatio, measures);
        this.parseByRefNumber("sqale_rating", this.measures.sqaleRating, measures);
        this.parseByRefNumber("reliability_rating", this.measures.reliabilityRating, measures);
        this.parseByRefNumber("files", this.measures.files, measures);
        this.parseByRefNumber("wont_fix_issues", this.measures.wontFixIssues, measures);
        this.parseByRefNumber("skipped_tests", this.measures.skippedTests, measures);
        this.parseByRefNumber("code_smells", this.measures.codeSmells, measures);
        this.parseByRefNumber("effort_to_reach_maintainability_rating_a", this.measures.effortToReachMaintainabilityRatingA, measures);
        this.parseByRefNumber("complexity", this.measures.complexity, measures);
        this.parseByRefNumber("comment_lines", this.measures.commentLines, measures);
        this.parseByRefNumber("duplicated_lines", this.measures.duplicatedLines, measures);
        this.parseByRefNumber("security_remediation_effort", this.measures.securityRemediationEffort, measures);
        this.parseByRefNumber("open_issues", this.measures.openIssues, measures);
        this.parseByRefNumber("test_errors", this.measures.testErrors, measures);
    }
    /**
     * Returns the object from the SonarQube-Webserver response which contains the metric
     * @param metric
     * @param measures
     * @private
     * @example return value:
     * {
     *      metric: "cognitive_complexity"
     *      value: 1346
     *      bestValue: false
     * }
     */
    SonarQubeMeasurement.prototype.getMeasure = function (metric, measures) {
        var measuresFromWebserver = measures.filter(function (measure) {
            return measure.metric === metric;
        });
        return measuresFromWebserver == null ? null : measuresFromWebserver[0];
    };
    /**
     * Searches the metric in measures and parses it into the measureContainer
     * @param metric
     * @param measureContainer
     * @param measures
     * @private
     */
    SonarQubeMeasurement.prototype.parseByRefNumber = function (metric, measureContainer, measures) {
        var measure = this.getMeasure(metric, measures);
        if (measure != null) {
            measureContainer.set(metric, parseFloat(measure.value), measure.bestValue);
        }
        else {
            measureContainer.set(metric, undefined, undefined);
        }
    };
    return SonarQubeMeasurement;
}());
exports.SonarQubeMeasurement = SonarQubeMeasurement;
var Measure = /** @class */ (function () {
    function Measure() {
    }
    Measure.prototype.set = function (name, value, bestValue) {
        this.name = name;
        this.value = value;
        this.bestValue = bestValue;
    };
    return Measure;
}());
exports.Measure = Measure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlTWVhc3VyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc29uYXJRdWJlUXVhbnRpZmllci9zb25hclF1YmVNZWFzdXJlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTtJQUFBO1FBQ0ksd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUMzQywyQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQzlDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN0QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3pDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDeEMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3ZDLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQy9CLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDNUMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDakMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDbEMsU0FBSSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDNUIsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ2hDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN0QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM3QixVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM3QixtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdEMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3BDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN0QyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFVLENB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