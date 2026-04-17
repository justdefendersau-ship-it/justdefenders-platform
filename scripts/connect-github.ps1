# ==================================================================================================
# File: C:\dev\justdefenders\scripts\connect-github.ps1
# Timestamp: 13 April 2026 12:42
# Purpose: Connect local repo to GitHub + enable auto push
# JustDefenders ©
# ==================================================================================================

$projectPath = "C:\dev\justdefenders"
Set-Location $projectPath

# ----------------------------------------------------------------------------------------------
# ⚠️ YOU MUST CREATE REPO FIRST
# ----------------------------------------------------------------------------------------------

Write-Host ""
Write-Host "👉 STEP 1: Create repo in GitHub:"
Write-Host "https://github.com/new"
Write-Host ""
Write-Host "Repo name: justdefenders-platform"
Write-Host "DO NOT add README"
Write-Host ""

# ----------------------------------------------------------------------------------------------
# GET REPO URL
# ----------------------------------------------------------------------------------------------

$repoUrl = Read-Host "Paste your GitHub repo URL (https://github.com/yourname/justdefenders-platform.git)"

# ----------------------------------------------------------------------------------------------
# CONNECT REMOTE
# ----------------------------------------------------------------------------------------------

git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host "✅ Remote connected"

# ----------------------------------------------------------------------------------------------
# PUSH FIRST TIME
# ----------------------------------------------------------------------------------------------

git branch -M main
git push -u origin main

Write-Host "✅ Initial push complete"

# ----------------------------------------------------------------------------------------------
# UPDATE AUTO BACKUP SCRIPT (ADD PUSH)
# ----------------------------------------------------------------------------------------------

$backupScriptPath = "$projectPath\scripts\auto-backup.ps1"

@"
# ==================================================================================================
# File: auto-backup.ps1
# Purpose: Auto backup + push to GitHub
# JustDefenders ©
# ==================================================================================================

Set-Location "$projectPath"

`$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "Auto backup - `$timestamp" 2>`$null
git push origin main

Write-Host "Backup pushed to GitHub: `$timestamp"
"@ | Set-Content -Path $backupScriptPath -Encoding UTF8

Write-Host "✅ Auto push enabled"

# ----------------------------------------------------------------------------------------------
# UPDATE DEV SCRIPT (AUTO PUSH)
# ----------------------------------------------------------------------------------------------

$devScriptPath = "$projectPath\scripts\dev-with-backup.ps1"

@"
# ==================================================================================================
# File: dev-with-backup.ps1
# Purpose: Backup + push before dev
# JustDefenders ©
# ==================================================================================================

Set-Location "$projectPath"

Write-Host "Running pre-dev backup..."

`$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "Pre-dev backup - `$timestamp" 2>`$null
git push origin main

Write-Host "Starting Next.js..."

npx next dev
"@ | Set-Content -Path $devScriptPath -Encoding UTF8

Write-Host "✅ Dev script updated (with push)"

Write-Host ""
Write-Host "🎉 GITHUB CONNECTED SUCCESSFULLY"
Write-Host ""
Write-Host "Now every backup is:"
Write-Host "✔ Saved locally"
Write-Host "✔ Pushed to GitHub"