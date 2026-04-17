# ==================================================================================================
# File: C:\dev\justdefenders\scripts\setup-git-backup.ps1
# Timestamp: 13 April 2026 12:35
# Purpose: Full Git Backup + Automation System
# JustDefenders ©
# ==================================================================================================

# ----------------------------------------------------------------------------------------------
# 1. ENSURE PROJECT PATH
# ----------------------------------------------------------------------------------------------

$projectPath = "C:\dev\justdefenders"
Set-Location $projectPath

# ----------------------------------------------------------------------------------------------
# 2. INIT GIT (if not already)
# ----------------------------------------------------------------------------------------------

if (!(Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialised"
}

# ----------------------------------------------------------------------------------------------
# 3. CREATE .gitignore
# ----------------------------------------------------------------------------------------------

@"
node_modules
.next
.env
.env.local
dist
build
coverage
*.log
"@ | Set-Content -Path ".gitignore" -Encoding UTF8

Write-Host "✅ .gitignore created"

# ----------------------------------------------------------------------------------------------
# 4. INITIAL COMMIT
# ----------------------------------------------------------------------------------------------

git add .
git commit -m "Initial backup - JustDefenders baseline"

# ----------------------------------------------------------------------------------------------
# 5. CREATE BACKUP SCRIPT
# ----------------------------------------------------------------------------------------------

$backupScriptPath = "$projectPath\scripts\auto-backup.ps1"

@"
# ==================================================================================================
# File: auto-backup.ps1
# Purpose: Automatic Git backup
# JustDefenders ©
# ==================================================================================================

Set-Location "$projectPath"

`$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "Auto backup - `$timestamp" 2>`$null

Write-Host "✅ Auto backup completed: `$timestamp"
"@ | Set-Content -Path $backupScriptPath -Encoding UTF8

Write-Host "✅ Auto backup script created"

# ----------------------------------------------------------------------------------------------
# 6. CREATE PRE-DEV BACKUP SCRIPT
# ----------------------------------------------------------------------------------------------

$devScriptPath = "$projectPath\scripts\dev-with-backup.ps1"

@"
# ==================================================================================================
# File: dev-with-backup.ps1
# Purpose: Backup BEFORE running dev server
# JustDefenders ©
# ==================================================================================================

Set-Location "$projectPath"

Write-Host "🔄 Running pre-dev backup..."

`$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "Pre-dev backup - `$timestamp" 2>`$null

Write-Host "🚀 Starting Next.js..."

npx next dev
"@ | Set-Content -Path $devScriptPath -Encoding UTF8

Write-Host "✅ Dev script with backup created"

# ----------------------------------------------------------------------------------------------
# 7. CREATE MANUAL SNAPSHOT SCRIPT
# ----------------------------------------------------------------------------------------------

$snapshotScriptPath = "$projectPath\scripts\snapshot.ps1"

@"
# ==================================================================================================
# File: snapshot.ps1
# Purpose: Manual named snapshot (restore point)
# JustDefenders ©
# ==================================================================================================

param(
    [string]`$name = "snapshot"
)

Set-Location "$projectPath"

`$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "SNAPSHOT: `$name - `$timestamp"

Write-Host "📸 Snapshot created: `$name"
"@ | Set-Content -Path $snapshotScriptPath -Encoding UTF8

Write-Host "✅ Snapshot script created"

# ----------------------------------------------------------------------------------------------
# 8. SCHEDULE DAILY BACKUP (TASK SCHEDULER)
# ----------------------------------------------------------------------------------------------

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File `"$backupScriptPath`""
$trigger = New-ScheduledTaskTrigger -Daily -At 9am

Register-ScheduledTask `
    -TaskName "JustDefenders Daily Backup" `
    -Action $action `
    -Trigger $trigger `
    -Force

Write-Host "✅ Daily backup scheduled (9am)"

# ----------------------------------------------------------------------------------------------
# COMPLETE
# ----------------------------------------------------------------------------------------------

Write-Host ""
Write-Host "🎉 GIT BACKUP SYSTEM READY"
Write-Host ""
Write-Host "USE:"
Write-Host "👉 Run dev safely: powershell scripts\dev-with-backup.ps1"
Write-Host "👉 Manual backup: powershell scripts\auto-backup.ps1"
Write-Host "👉 Snapshot: powershell scripts\snapshot.ps1 -name 'before major change'"