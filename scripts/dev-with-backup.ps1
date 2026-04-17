# ==================================================================================================
# File: dev-with-backup.ps1
# Purpose: Backup + push before dev
# JustDefenders Â©
# ==================================================================================================

Set-Location "C:\dev\justdefenders"

Write-Host "Running pre-dev backup..."

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "Pre-dev backup - $timestamp" 2>$null
git push origin main

Write-Host "Starting Next.js..."

npx next dev
