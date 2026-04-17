@echo on
echo ==========================================
echo JustDefenders Direct Start (HARD FIX)
echo ==========================================

cd /d C:\dev\justdefenders

echo Using Node from Program Files...

echo Starting harvester...
start cmd /k "C:\Program Files\nodejs\node.exe harvester.cjs"

echo Starting crawler...
start cmd /k "C:\Program Files\nodejs\node.exe crawler.cjs"

echo.
echo Both services launched in separate windows
pause
