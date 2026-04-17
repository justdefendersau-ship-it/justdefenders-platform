# ==================================================================================================
# File: C:\dev\justdefenders\scripts\setup-daily-backup.ps1
# Timestamp: 13 April 2026 13:40
# Purpose: Daily Git backup at 02:00 local time
# JustDefenders ©
# ==================================================================================================

$projectPath = "C:\dev\justdefenders"
$scriptPath = "$projectPath\scripts\auto-backup.ps1"

# Create script folder
New-Item -ItemType Directory -Force -Path "$projectPath\scripts" | Out-Null

# Create backup script
@'
# ==================================================================================================
# File: auto-backup.ps1
# Purpose: Daily auto backup + push
# JustDefenders ©
# ==================================================================================================

Set-Location "C:\dev\justdefenders"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "AUTO BACKUP (02:00) - $timestamp" 2>$null
git push origin main

Write-Host "Backup complete: $timestamp"
'@ | Set-Content -Path $scriptPath -Encoding UTF8

# Schedule task at 02:00
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File `"$scriptPath`""
$trigger = New-ScheduledTaskTrigger -Daily -At 2am

Register-ScheduledTask `
    -TaskName "JustDefenders Daily Backup 02:00" `
    -Action $action `
    -Trigger $trigger `
    -Force

Write-Host "✅ Daily backup scheduled at 02:00"