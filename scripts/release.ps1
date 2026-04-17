# ==================================================================================================
# File: C:\dev\justdefenders\scripts\release.ps1
# Timestamp: 13 April 2026 13:40
# Purpose: Create versioned release snapshot + tag
# JustDefenders ©
# ==================================================================================================

param(
    [string]$version = "v1.0.0"
)

Set-Location "C:\dev\justdefenders"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add .
git commit -m "RELEASE $version - $timestamp"

git tag $version
git push origin main
git push origin $version

Write-Host "✅ RELEASE CREATED: $version"