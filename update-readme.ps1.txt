# Path to the coverage summary file
$coverageSummaryPath = "./coverage/coverage-summary.json"

# Read the coverage summary JSON file
$coverageSummary = Get-Content $coverageSummaryPath | ConvertFrom-Json

# Extract the line coverage percentage
$lineCoverage = $coverageSummary.total.lines.pct

# Path to the README.md file
$readmePath = "./README.md"

# Read the README.md content
$readmeContent = Get-Content $readmePath

# Create the coverage badge URL
$coverageBadge = "!Coverage"

# Replace the existing coverage badge in README.md
$updatedReadmeContent = $readmeContent -replace "!\[Coverage\]\(.*\)", $coverageBadge

# Write the updated content back to README.md
Set-Content $readmePath -Value $updatedReadmeContent
