export class SonarQubeMeasures {
    cognitiveComplexity = new Measure<number>()
    duplicatedLinesDensity = new Measure<number>()
    securityRating = new Measure<number>()
    blockerViolations = new Measure<number>()
    duplicatedBlocks = new Measure<number>()
    vulnerabilities = new Measure<number>()
    classes = new Measure<number>()
    securityReviewRating = new Measure<number>()
    functions = new Measure<number>()
    sqaleIndex = new Measure<number>()
    bugs = new Measure<number>()
    infoViolations = new Measure<number>()
    coverage = new Measure<number>()
    generatedNcloc = new Measure<number>()
    lines = new Measure<number>()
    ncloc = new Measure<number>()
    generatedLines = new Measure<number>()
    linesToCover = new Measure<number>()
    reopenedIssues = new Measure<number>()
    confirmedIssues = new Measure<number>()
    testSuccessDensity = new Measure<number>()
    securityHotspots = new Measure<number>()
    majorViolations = new Measure<number>()
    violations = new Measure<number>()
    uncoveredLines = new Measure<number>()
    minorViolations = new Measure<number>()
    criticalViolations = new Measure<number>()
    falsePositiveIssues = new Measure<number>()
    statements = new Measure<number>()
    testFailures = new Measure<number>()
    duplicatedFiles = new Measure<number>()
    reliabilityRemediationEffort = new Measure<number>()
    commentLinesDensity = new Measure<number>()
    lineCoverage = new Measure<number>()
    sqaleDebtRatio = new Measure<number>()
    sqaleRating = new Measure<number>()
    reliabilityRating = new Measure<number>()
    files = new Measure<number>()
    wontFixIssues = new Measure<number>()
    skippedTests = new Measure<number>()
    codeSmells = new Measure<number>()
    effortToReachMaintainabilityRatingA = new Measure<number>()
    complexity = new Measure<number>()
    commentLines = new Measure<number>()
    duplicatedLines = new Measure<number>()
    securityRemediationEffort = new Measure<number>()
    openIssues = new Measure<number>()
    testErrors = new Measure<number>()
}
/**
 * This class is dependent on SonarQube version 9.0.1
 */
export class SonarQubeMeasurement {

    /**
     * Generates a SonarQubeMeasurements out of the response from the
     * SonarQube-webserver
     * @param response
     */
    constructor(response?: any) {
        if (response == undefined) {
            return;
        }

        const component = response.component
        const measures = component.measures

        this.qualifier = component.qualifier
        this.language = component.language

        this.parseByRefNumber("cognitive_complexity", this.measures.cognitiveComplexity, measures)
        this.parseByRefNumber("duplicated_lines_density", this.measures.duplicatedLinesDensity, measures)
        this.parseByRefNumber("security_rating", this.measures.securityRating, measures)
        this.parseByRefNumber("blocker_violations", this.measures.blockerViolations, measures)
        this.parseByRefNumber("duplicated_blocks", this.measures.duplicatedBlocks, measures)
        this.parseByRefNumber("vulnerabilities", this.measures.vulnerabilities, measures)
        this.parseByRefNumber("classes", this.measures.classes, measures)
        this.parseByRefNumber("security_review_rating", this.measures.securityReviewRating, measures)
        this.parseByRefNumber("functions", this.measures.functions, measures)
        this.parseByRefNumber("sqale_index", this.measures.sqaleIndex, measures)
        this.parseByRefNumber("bugs", this.measures.bugs, measures)
        this.parseByRefNumber("info_violations", this.measures.infoViolations, measures)
        this.parseByRefNumber("coverage", this.measures.coverage, measures)
        this.parseByRefNumber("generated_ncloc", this.measures.generatedNcloc, measures)
        this.parseByRefNumber("lines", this.measures.lines, measures)
        this.parseByRefNumber("ncloc", this.measures.ncloc, measures)
        this.parseByRefNumber("generated_lines", this.measures.generatedLines, measures)
        this.parseByRefNumber("lines_to_cover", this.measures.linesToCover, measures)
        this.parseByRefNumber("reopened_issues", this.measures.reopenedIssues, measures)
        this.parseByRefNumber("confirmed_issues", this.measures.confirmedIssues, measures)
        this.parseByRefNumber("test_success_density", this.measures.testSuccessDensity, measures)
        this.parseByRefNumber("security_hotspots", this.measures.securityHotspots, measures)
        this.parseByRefNumber("major_violations", this.measures.majorViolations, measures)
        this.parseByRefNumber("violations", this.measures.violations, measures)
        this.parseByRefNumber("uncovered_lines", this.measures.uncoveredLines, measures)
        this.parseByRefNumber("minor_violations", this.measures.minorViolations, measures)
        this.parseByRefNumber("critical_violations", this.measures.criticalViolations, measures)
        this.parseByRefNumber("false_positive_issues", this.measures.falsePositiveIssues, measures)
        this.parseByRefNumber("statements", this.measures.statements, measures)
        this.parseByRefNumber("test_failures", this.measures.testFailures, measures)
        this.parseByRefNumber("duplicated_files", this.measures.duplicatedFiles, measures)
        this.parseByRefNumber("reliability_remediation_effort", this.measures.reliabilityRemediationEffort, measures)
        this.parseByRefNumber("comment_lines_density", this.measures.commentLines, measures)
        this.parseByRefNumber("line_coverage", this.measures.lineCoverage, measures)
        this.parseByRefNumber("sqale_debt_ratio", this.measures.sqaleDebtRatio, measures)
        this.parseByRefNumber("sqale_rating", this.measures.sqaleRating, measures)
        this.parseByRefNumber("reliability_rating", this.measures.reliabilityRating, measures)
        this.parseByRefNumber("files", this.measures.files, measures)
        this.parseByRefNumber("wont_fix_issues", this.measures.wontFixIssues, measures)
        this.parseByRefNumber("skipped_tests", this.measures.skippedTests, measures)
        this.parseByRefNumber("code_smells", this.measures.codeSmells, measures)
        this.parseByRefNumber("effort_to_reach_maintainability_rating_a", this.measures.effortToReachMaintainabilityRatingA, measures)
        this.parseByRefNumber("complexity", this.measures.complexity, measures)
        this.parseByRefNumber("comment_lines", this.measures.commentLines, measures)
        this.parseByRefNumber("duplicated_lines", this.measures.duplicatedLines, measures)
        this.parseByRefNumber("security_remediation_effort", this.measures.securityRemediationEffort, measures)
        this.parseByRefNumber("open_issues", this.measures.openIssues, measures)
        this.parseByRefNumber("test_errors", this.measures.testErrors, measures)

    }

    qualifier?: string
    language?: string

    measures: SonarQubeMeasures = new SonarQubeMeasures()
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
    private getMeasure(metric: string, measures: any[]): any {
        const measuresFromWebserver = measures.filter(measure => {
            return measure.metric === metric
        })
        return measuresFromWebserver == null ? null : measuresFromWebserver[0]
    }

    /**
     * Searches the metric in measures and parses it into the measureContainer
     * @param metric
     * @param measureContainer
     * @param measures
     * @private
     */
    private parseByRefNumber(metric: string, measureContainer: Measure<number>, measures: any[]) {
        const measure = this.getMeasure(metric, measures)
        if (measure != null) {
            measureContainer.set(metric, parseFloat(measure.value), measure.bestValue)
        } else {
            measureContainer.set(metric, undefined, undefined)
        }
    }

}


export class Measure<T> {
    public name: string
    public value: T
    public bestValue?: boolean

    set(name: string, value: T, bestValue?: boolean) {
        this.name = name
        this.value = value
        this.bestValue = bestValue
    }


}