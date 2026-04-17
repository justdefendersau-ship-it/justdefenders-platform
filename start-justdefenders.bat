@echo on
echo ==========================================
echo JustDefenders Startup (WORKING VERSION)
echo ==========================================

cd /d C:\dev\justdefenders

echo Starting harvester...
start cmd /k node harvester.cjs

echo Starting crawler...
start cmd /k node crawler.cjs

echo.
echo Both services launched in separate windows
pause
