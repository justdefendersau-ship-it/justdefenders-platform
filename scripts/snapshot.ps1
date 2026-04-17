# ==================================================================================================
# File: snapshot.ps1
# Timestamp: 13 April 2026 12:40
# Purpose: Manual named snapshot (safe version)
# JustDefenders ©
# ==================================================================================================

param(
    [string]$name = "snapshot"
)

Set-Location "C:\dev\justdefenders"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "SNAPSHOT: $name - $timestamp" 2>$null

Write-Host "Snapshot created: $name"
