# ======================================================================================
# Timestamp: 19 April 2026 16:30
# JustDefenders
# File: C:\dev\justdefenders\scripts\backup-dashboard.ps1
# Description:
# VERIFIED dashboard backup (clean, no encoding or quote issues)
# ======================================================================================

Write-Host ""
Write-Host "Running dashboard backup..." -ForegroundColor Cyan

$source = "C:\dev\justdefenders\frontend\app\dashboard\page.tsx"
$backupDir = "C:\dev\justdefenders\backups"

if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$backupDir\dashboard_$timestamp.tsx"

Copy-Item $source $backupFile -Force

if (Test-Path $backupFile) {
    Write-Host ""
    Write-Host "BACKUP SUCCESSFUL" -ForegroundColor Green
    Write-Host $backupFile
} else {
    Write-Host ""
    Write-Host "BACKUP FAILED" -ForegroundColor Red
}

Write-Host ""
Write-Host "Restore command:" -ForegroundColor Yellow
Write-Host ("Copy-Item '" + $backupFile + "' '" + $source + "' -Force")
Write-Host ""
