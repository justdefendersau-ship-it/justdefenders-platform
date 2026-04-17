# ============================================================
# JustDefenders ©
# File: C:\dev\justdefenders\scripts\setup\02_project_setup.ps1
# Timestamp: 31-03-2026 13:30 (Sydney)
# Purpose: SAFE project setup with dependency validation
# ============================================================

$ROOT = "C:\dev"
$PROJECT_PATH = "$ROOT\justdefenders"
$REPO_URL = "<YOUR_REPO_URL>"

# --- CHECK GIT ---
try {
    git --version | Out-Null
} catch {
    Write-Host "? Git is not installed or not in PATH"
    exit
}

# --- CREATE ROOT ---
if (!(Test-Path $ROOT)) {
    New-Item -ItemType Directory -Path $ROOT
}

Set-Location $ROOT

# --- CLONE PROJECT ---
if (!(Test-Path $PROJECT_PATH)) {
    Write-Host "Cloning repository..."
    git clone $REPO_URL justdefenders
} else {
    Write-Host "Project already exists"
}

Set-Location $PROJECT_PATH

Write-Host "? Project Ready"
