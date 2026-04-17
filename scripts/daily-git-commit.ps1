# ============================================
# File: daily-git-commit.ps1
# JustDefenders ©
# ============================================

Write-Host "=== RUNNING DAILY GIT COMMIT ==="

cd C:\dev\justdefenders

git add .

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

# Check for changes
$status = git status --porcelain

if ($status) {
    git commit -m "Auto checkpoint: $timestamp"
    Write-Host "SUCCESS: Changes committed"
} else {
    Write-Host "INFO: No changes to commit"
}