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
        this.squaleIndex = new Measure();
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
        var meta = response.component;
        var measures = response.measures;
        this.qualifier = meta.qualifier;
        this.language = meta.language;
        this.parseByRefNumber("cognitive_complexity", this.cognitiveComplexity, measures);
        this.parseByRefNumber("duplicated_lines_density", this.cognitiveComplexity, measures);
        this.parseByRefNumber("security_rating", this.cognitiveComplexity, measures);
        this.parseByRefNumber("blocker_violations", this.cognitiveComplexity, measures);
        this.parseByRefNumber("duplicated_blocks", this.cognitiveComplexity, measures);
        this.parseByRefNumber("vulnerabilities", this.cognitiveComplexity, measures);
        this.parseByRefNumber("classes", this.cognitiveComplexity, measures);
        this.parseByRefNumber("security_review_rating", this.cognitiveComplexity, measures);
        this.parseByRefNumber("functions", this.cognitiveComplexity, measures);
        this.parseByRefNumber("sqale_index", this.cognitiveComplexity, measures);
        this.parseByRefNumber("bugs", this.cognitiveComplexity, measures);
        this.parseByRefNumber("info_violations", this.cognitiveComplexity, measures);
        this.parseByRefNumber("coverage", this.cognitiveComplexity, measures);
        this.parseByRefNumber("generated_ncloc", this.cognitiveComplexity, measures);
        this.parseByRefNumber("lines", this.cognitiveComplexity, measures);
        this.parseByRefNumber("ncloc", this.cognitiveComplexity, measures);
        this.parseByRefNumber("generated_lines", this.cognitiveComplexity, measures);
        this.parseByRefNumber("lines_to_cover", this.cognitiveComplexity, measures);
        this.parseByRefNumber("reopened_issues", this.cognitiveComplexity, measures);
        this.parseByRefNumber("confirmed_issues", this.cognitiveComplexity, measures);
        this.parseByRefNumber("test_success_density", this.cognitiveComplexity, measures);
        this.parseByRefNumber("security_hotspots", this.cognitiveComplexity, measures);
        this.parseByRefNumber("major_violations", this.cognitiveComplexity, measures);
        this.parseByRefNumber("violations", this.cognitiveComplexity, measures);
        this.parseByRefNumber("uncovered_lines", this.cognitiveComplexity, measures);
        this.parseByRefNumber("minor_violations", this.cognitiveComplexity, measures);
        this.parseByRefNumber("critical_violations", this.cognitiveComplexity, measures);
        this.parseByRefNumber("false_positive_issues", this.cognitiveComplexity, measures);
        this.parseByRefNumber("statements", this.cognitiveComplexity, measures);
        this.parseByRefNumber("test_failures", this.cognitiveComplexity, measures);
        this.parseByRefNumber("duplicated_files", this.cognitiveComplexity, measures);
        this.parseByRefNumber("reliability_remediation_effort", this.cognitiveComplexity, measures);
        this.parseByRefNumber("comment_lines_density", this.cognitiveComplexity, measures);
        this.parseByRefNumber("line_coverage", this.cognitiveComplexity, measures);
        this.parseByRefNumber("sqale_debt_ratio", this.cognitiveComplexity, measures);
        this.parseByRefNumber("sqale_rating", this.cognitiveComplexity, measures);
        this.parseByRefNumber("reliability_rating", this.cognitiveComplexity, measures);
        this.parseByRefNumber("files", this.cognitiveComplexity, measures);
        this.parseByRefNumber("wont_fix_issues", this.cognitiveComplexity, measures);
        this.parseByRefNumber("skipped_tests", this.cognitiveComplexity, measures);
        this.parseByRefNumber("code_smells", this.cognitiveComplexity, measures);
        this.parseByRefNumber("effort_to_reach_maintainability_rating_a", this.cognitiveComplexity, measures);
        this.parseByRefNumber("complexity", this.cognitiveComplexity, measures);
        this.parseByRefNumber("comment_lines", this.cognitiveComplexity, measures);
        this.parseByRefNumber("duplicated_lines", this.cognitiveComplexity, measures);
        this.parseByRefNumber("security_remediation_effort", this.cognitiveComplexity, measures);
        this.parseByRefNumber("open_issues", this.cognitiveComplexity, measures);
        this.parseByRefNumber("test_errors", this.cognitiveComplexity, measures);
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
        return measures.filter(function (measure) {
            return measure.metric === metric;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29uYXJRdWJlTWVhc3VyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU29uYXJRdWJlTWVhc3VyZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSDtJQUVJOzs7O09BSUc7SUFDSCw4QkFBWSxRQUFhO1FBNkR6Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQzNDLDJCQUFzQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDOUMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDekMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN4QyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdkMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDL0IseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM1QyxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNqQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDbkMsU0FBSSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDNUIsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ2hDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN0QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM3QixVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUM3QixtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdEMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3BDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN0QyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdkMsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUMxQyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3hDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUN2QyxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNsQyxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDdEMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3ZDLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDMUMsd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUMzQyxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNsQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDcEMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3ZDLGlDQUE0QixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDcEQsd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUMzQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDcEMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3RDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3pDLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQzdCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNyQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDcEMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDbEMsd0NBQW1DLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUMzRCxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQTtRQUNsQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDcEMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFBO1FBQ3ZDLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDakQsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUFDbEMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUE7UUEzRzlCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUE7UUFDL0IsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQTtRQUVsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBRTdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDakYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNyRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDL0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3BFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDbkYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM1RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDNUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDN0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNqRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDN0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDdkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM1RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNsRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDM0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNsRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDL0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM1RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMENBQTBDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3JHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDN0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN4RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUU1RSxDQUFDO0lBc0REOzs7Ozs7Ozs7OztPQVdHO0lBQ0sseUNBQVUsR0FBbEIsVUFBbUIsTUFBYyxFQUFFLFFBQWU7UUFDOUMsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTztZQUMxQixPQUFPLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFBO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLCtDQUFnQixHQUF4QixVQUF5QixNQUFjLEVBQUUsZ0JBQWlDLEVBQUUsUUFBZTtRQUN2RixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNqRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFJTCwyQkFBQztBQUFELENBQUMsQUFySkQsSUFxSkM7QUFySlksb0RBQW9CO0FBdUpqQztJQUFBO0lBV0EsQ0FBQztJQU5HLHFCQUFHLEdBQUgsVUFBSSxJQUFZLEVBQUUsS0FBUSxFQUFFLFNBQW1CO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzlCLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFYWSwwQkFBTyJ9