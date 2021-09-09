"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measure = exports.SonarQubeMeasurement = void 0;
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
        var component = response.component;
        var measures = component.measures;
        this.qualifier = component.qualifier;
        this.language = component.language;
        this.parseByRefNumber("cognitive_complexity", this.cognitiveComplexity, measures);
        this.parseByRefNumber("duplicated_lines_density", this.duplicatedLinesDensity, measures);
        this.parseByRefNumber("security_rating", this.securityRating, measures);
        this.parseByRefNumber("blocker_violations", this.blockerViolations, measures);
        this.parseByRefNumber("duplicated_blocks", this.duplicatedBlocks, measures);
        this.parseByRefNumber("vulnerabilities", this.vulnerabilities, measures);
        this.parseByRefNumber("classes", this.classes, measures);
        this.parseByRefNumber("security_review_rating", this.securityReviewRating, measures);
        this.parseByRefNumber("functions", this.functions, measures);
        this.parseByRefNumber("sqale_index", this.sqaleIndex, measures);
        this.parseByRefNumber("bugs", this.bugs, measures);
        this.parseByRefNumber("info_violations", this.infoViolations, measures);
        this.parseByRefNumber("coverage", this.coverage, measures);
        this.parseByRefNumber("generated_ncloc", this.generatedNcloc, measures);
        this.parseByRefNumber("lines", this.lines, measures);
        this.parseByRefNumber("ncloc", this.ncloc, measures);
        this.parseByRefNumber("generated_lines", this.generatedLines, measures);
        this.parseByRefNumber("lines_to_cover", this.linesToCover, measures);
        this.parseByRefNumber("reopened_issues", this.reopenedIssues, measures);
        this.parseByRefNumber("confirmed_issues", this.confirmedIssues, measures);
        this.parseByRefNumber("test_success_density", this.testSuccessDensity, measures);
        this.parseByRefNumber("security_hotspots", this.securityHotspots, measures);
        this.parseByRefNumber("major_violations", this.majorViolations, measures);
        this.parseByRefNumber("violations", this.violations, measures);
        this.parseByRefNumber("uncovered_lines", this.uncoveredLines, measures);
        this.parseByRefNumber("minor_violations", this.minorViolations, measures);
        this.parseByRefNumber("critical_violations", this.criticalViolations, measures);
        this.parseByRefNumber("false_positive_issues", this.falsePositiveIssues, measures);
        this.parseByRefNumber("statements", this.statements, measures);
        this.parseByRefNumber("test_failures", this.testFailures, measures);
        this.parseByRefNumber("duplicated_files", this.duplicatedFiles, measures);
        this.parseByRefNumber("reliability_remediation_effort", this.reliabilityRemediationEffort, measures);
        this.parseByRefNumber("comment_lines_density", this.commentLines, measures);
        this.parseByRefNumber("line_coverage", this.lineCoverage, measures);
        this.parseByRefNumber("sqale_debt_ratio", this.sqaleDebtRatio, measures);
        this.parseByRefNumber("sqale_rating", this.sqaleRating, measures);
        this.parseByRefNumber("reliability_rating", this.reliabilityRating, measures);
        this.parseByRefNumber("files", this.files, measures);
        this.parseByRefNumber("wont_fix_issues", this.wontFixIssues, measures);
        this.parseByRefNumber("skipped_tests", this.skippedTests, measures);
        this.parseByRefNumber("code_smells", this.codeSmells, measures);
        this.parseByRefNumber("effort_to_reach_maintainability_rating_a", this.effortToReachMaintainabilityRatingA, measures);
        this.parseByRefNumber("complexity", this.complexity, measures);
        this.parseByRefNumber("comment_lines", this.commentLines, measures);
        this.parseByRefNumber("duplicated_lines", this.duplicatedLines, measures);
        this.parseByRefNumber("security_remediation_effort", this.securityRemediationEffort, measures);
        this.parseByRefNumber("open_issues", this.openIssues, measures);
        this.parseByRefNumber("test_errors", this.testErrors, measures);
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
        // TODO: sonderfall: falls keine measure gefunden wurde ist das null, null[0] ist ungünstig
        return measures.filter(function (measure) {
            return measure.metric === metric;
        })[0];
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
        measureContainer.set(metric, parseFloat(measure.value), measure.bestValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29uYXJRdWJlTWVhc3VyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU29uYXJRdWJlTWVhc3VyZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSDtJQUVJOzs7O09BSUc7SUFDSCw4QkFBWSxRQUFhO1FBNkR6Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQzNDLDJCQUFzQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDOUMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDekMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN4QyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdkMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDL0IseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM1QyxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNqQyxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNsQyxTQUFJLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM1QixtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdEMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDaEMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQzdCLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQzdCLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN0QyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDcEMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLG9CQUFlLEdBQUcsSUFB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