@echo off
title JustDefenders Unified

echo Killing old processes...
taskkill /f /im node.exe >nul 2>&1

timeout /t 2 >nul

echo Starting system...

start "" cmd /c node apiServer.cjs
start "" cmd /c node crawler.cjs
start "" cmd /c node harvester.cjs
start "" cmd /c node alertEngine.cjs
start "" cmd /c node intelligenceEngine.cjs
start "" cmd /c node predictEngine.cjs
start "" cmd /c node emailAlerts.cjs
start "" cmd /c node parts-api\server.js

echo.
echo System running in background
pause