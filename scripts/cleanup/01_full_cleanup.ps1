# ============================================================
# JustDefenders  
# File: C:\dev\justdefenders\scripts\cleanup\01_full_cleanup.ps1
# Timestamp: 30-03-2026 14:45 (Sydney)
# Purpose: Remove obsolete files, folders, and reset clean state
# ============================================================

$ROOT = "C:\dev\justdefenders"

Write-Host "=== JustDefenders Cleanup Started ==="

function Safe-Remove($path) {
    if (Test-Path $path) {
        Write-Host "Removing: $path"
        Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
    } else {
        Write-Host "Skip (not found): $path"
    }
}

Safe-Remove "$ROOT\.next"
Safe-Remove "$ROOT\node_modules"
Safe-Remove "$ROOT\mobile-app"
Safe-Remove "$ROOT\justdefenders-mobile"
Safe-Remove "$ROOT\scr"
Safe-Remove "$ROOT\docs"
Safe-Remove "$ROOT\platform-structure.txt"
Safe-Remove "$ROOT\route-map.txt"
Safe-Remove "$ROOT\unused-code-report.txt"
Safe-Remove "$ROOT\justdefenders-app-map.txt"

Write-Host "=== Cleanup Complete ==="
