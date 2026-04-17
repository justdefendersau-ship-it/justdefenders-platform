# ==================================================================================================
# File: C:\dev\justdefenders\deploy\phase4d_verify_sparesbox_connector_2026-04-09_0620.ps1
# Timestamp: 09 April 2026 06:20
# Purpose: Verify sparesboxConnector.cjs integrity
# Author: JustDefenders ©
# ==================================================================================================
Write-Host "=== VERIFY CONNECTOR ===" -ForegroundColor Cyan
$targetFile = "C:\dev\justdefenders\backend\sparesboxConnector.cjs"
if (!(Test-Path $targetFile)) {
    Write-Host "❌ File missing" -ForegroundColor Red
    exit
}
Write-Host "✔ File exists" -ForegroundColor Green
Write-Host ""
Write-Host "=== CHECK $$eval ==="
$found = $false
Get-Content $targetFile | ForEach-Object {
    if ($_ -like '*$$eval*') {
        Write-Host "✔ $$eval found" -ForegroundColor Green
        $found = $true
    }
}
if (-not $found) {
    Write-Host "❌ $$eval missing" -ForegroundColor Red
    exit
}
Write-Host ""
Write-Host "=== CHECK CORRUPTION ==="
$corrupt = $false
Get-Content $targetFile | ForEach-Object {
    if ($_ -like '*C:\dev\justdefenders*') {
        Write-Host "❌ Corruption detected: $_" -ForegroundColor Red
        $corrupt = $true
    }
}
if (-not $corrupt) {
    Write-Host "✔ No corruption detected" -ForegroundColor Green
}
Write-Host ""
Write-Host "✔ Verification complete"
