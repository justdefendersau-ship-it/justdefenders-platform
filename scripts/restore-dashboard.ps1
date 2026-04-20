# ======================================================================================
# Timestamp: 19 April 2026 19:05
# JustDefenders
# File: C:\dev\justdefenders\scripts\restore-dashboard.ps1
# Description:
# Restores latest working dashboard backup
# ======================================================================================

Write-Host ""
Write-Host "Restoring last working dashboard..." -ForegroundColor Cyan

$backupDir = "C:\dev\justdefenders\backups"
$target = "C:\dev\justdefenders\frontend\app\dashboard\page.tsx"

# Get latest backup
$latest = Get-ChildItem $backupDir -Filter "dashboard_*.tsx" |
          Sort-Object LastWriteTime -Descending |
          Select-Object -First 1

if ($latest -eq $null) {
    Write-Host "No backup found!" -ForegroundColor Red
    exit
}

Copy-Item $latest.FullName $target -Force

Write-Host ""
Write-Host "RESTORED SUCCESSFULLY" -ForegroundColor Green
Write-Host $latest.FullName
Write-Host ""
