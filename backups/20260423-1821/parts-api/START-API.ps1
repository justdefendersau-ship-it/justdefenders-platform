# ======================================================================================
# JustDefenders ©
# START API SCRIPT
# ======================================================================================

Write-Host ""
Write-Host "Starting JustDefenders API..." -ForegroundColor Cyan

cd C:\dev\justdefenders\parts-api

# Kill existing node processes (clean start)
taskkill /f /im node.exe > $null 2>&1

Start-Sleep -Seconds 2

node server.js
