Write-Host ""
Write-Host "===== JustDefenders Frontend Hard Reset =====" -ForegroundColor Cyan

# Kill all node processes
Write-Host "Stopping Node processes..." -ForegroundColor Red
taskkill /f /im node.exe > $null 2>&1

Start-Sleep -Seconds 2

# Navigate to frontend
cd C:\dev\justdefenders\frontend

# Remove Next.js cache
Write-Host "Removing .next cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Remove Turbopack cache
Write-Host "Removing node cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# Restart dev server
Write-Host "Starting dev server..." -ForegroundColor Green
npm run dev
