# ==================================================================================================
# File: auto-backup.ps1
# Purpose: Auto backup + push to GitHub
# JustDefenders Â©
# ==================================================================================================

Set-Location "C:\dev\justdefenders"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "Auto backup - $timestamp" 2>$null
git push origin main

Write-Host "Backup pushed to GitHub: $timestamp"
