@echo off
echo Restarting data services...

taskkill /f /im node.exe

timeout /t 2

start cmd /k node harvester.cjs
start cmd /k node crawler.cjs

echo Data services restarted
pause
