/**
 * This class is dependent on SonarQube version 9.0.1
 */
export class SonarQubeMeasurement {

    /**
     * Generates a SonarQubeMeasurements out of the response from the
     * SonarQube-webserver
     * @param response
     */
    constructor(response: any) {
        const component = response.component
        const measures = component.measures

        this.qualifier = component.qualifier
        this.language = component.language

        this.parseByRefNumber("cognitive_complexity", this.cognitiveComplexity, measures)
        this.parseByRefNumber("duplicated_lines_density", this.duplicatedLinesDensity, measures)
        this.parseByRefNumber("security_rating", this.securityRating, measures)
        this.parseByRefNumber("blocker_violations", this.blockerViolations, measures)
        this.parseByRefNumber("duplicated_blocks", this.duplicatedBlocks, measures)
        this.parseByRefNumber("vulnerabilities", this.vulnerabilities, measures)
        this.parseByRefNumber("classes", this.classes, measures)
        this.parseByRefNumber("security_review_rating", this.securityReviewRating, measures)
        this.parseByRefNumber("functions", this.functions, measures)
        this.parseByRefNumber("sqale_index", this.sqaleIndex, measures)
        this.parseByRefNumber("bugs", this.bugs, measures)
        this.parseByRefNumber("info_violations", this.infoViolations, measures)
        this.parseByRefNumber("coverage", this.coverage, measures)
        this.parseByRefNumber("generated_ncloc", this.generatedNcloc, measures)
        this.parseByRefNumber("lines", this.lines, measures)
        this.parseByRefNumber("ncloc", this.ncloc, measures)
        this.parseByRefNumber("generated_lines", this.generatedLines, measures)
        this.parseByRefNumber("lines_to_cover", this.linesToCover, measures)
        this.parseByRefNumber("reopened_issues", this.reopenedIssues, measures)
        this.parseByRefNumber("confirmed_issues", this.confirmedIssues, measures)
        this.parseByRefNumber("test_success_density", this.testSuccessDensity, measures)
        this.parseByRefNumber("security_hotspots", this.securityHotspots, measures)
        this.parseByRefNumber("major_violations", this.majorViolations, measures)
        this.parseByRefNumber("violations", this.violations, measures)
        this.parseByRefNumber("uncovered_lines", this.uncoveredLines, measures)
        this.parseByRefNumber("minor_violations", this.minorViolations, measures)
        this.parseByRefNumber("critical_violations", this.criticalViolations, measures)
        this.parseByRefNumber("false_positive_issues", this.falsePositiveIssues, measures)
        this.parseByRefNumber("statements", this.statements, measures)
        this.parseByRefNumber("test_failures", this.testFailures, measures)
        this.parseByRefNumber("duplicated_files", this.duplicatedFiles, measures)
        this.parseByRefNumber("reliability_remediation_effort", this.reliabilityRemediationEffort, measures)
        this.parseByRefNumber("comment_lines_density", this.commentLines, measures)
        this.parseByRefNumber("line_coverage", this.lineCoverage, measures)
        this.parseByRefNumber("sqale_debt_ratio", this.sqaleDebtRatio, measures)
        this.parseByRefNumber("sqale_rating", this.sqaleRating, measures)
        this.parseByRefNumber("reliability_rating", this.reliabilityRating, measures)
        this.parseByRefNumber("files", this.files, measures)
        this.parseByRefNumber("wont_fix_issues", this.wontFixIssues, measures)
        this.parseByRefNumber("skipped_tests", this.skippedTests, measures)
        this.parseByRefNumber("code_smells", this.codeSmells, measures)
        this.parseByRefNumber("effort_to_reach_maintainability_rating_a", this.effortToReachMaintainabilityRatingA, measures)
        this.parseByRefNumber("complexity", this.complexity, measures)
        this.parseByRefNumber("comment_lines", this.commentLines, measures)
        this.parseByRefNumber("duplicated_lines", this.duplicatedLines, measures)
        this.parseByRefNumber("security_remediation_effort", this.securityRemediationEffort, measures)
        this.parseByRefNumber("open_issues", this.openIssues, measures)
        this.parseByRefNumber("test_errors", this.testErrors, measures)

    }

    qualifier: string
    language: string

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











        // TODO: sonderfall: falls keine measure gefunden wurde ist das null, null[0] ist ungünstig




        return measures.filter(measure => {
            return measure.metric === metric
        })[0]
















    }

    /**
     * Searches the metric in measures and parses it into the measureContainer
     * @param metric
     * @param measureContainer
     * @param measures
     * @private
     */
    private parseByRefNumber(metric: string, measureContainer: Measure<number>, measures: any[]){
        const measure = this.getMeasure(metric, measures)
        measureContainer.set(metric, parseFloat(measure.value), measure.bestValue)
    }

}

export class Measure<T> {
    public name: string
    public value: T
    public bestValue?: boolean

    set(name: string, value: T, bestValue?: boolean){
        this.name = name
        this.value = value
        this.bestValue = bestValue
    }

}