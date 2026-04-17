# ============================================
# File: validate-system.ps1
# JustDefenders ©
# ============================================

Write-Host "====================================="
Write-Host "JUSTDEFENDERS SYSTEM VALIDATION"
Write-Host "====================================="

$base = "http://localhost:8081"

# ----------------------------
# CHECK FILES
# ----------------------------
Write-Host "`n[FILES]"

$dataFile = "C:\dev\justdefenders\data\price_history.json"
$logFile = "C:\dev\justdefenders\data\system.log"

if (Test-Path $dataFile) {
    Write-Host "PASS: price_history.json exists"
} else {
    Write-Host "FAIL: price_history.json missing"
}

if (Test-Path $logFile) {
    Write-Host "PASS: system.log exists"
} else {
    Write-Host "FAIL: system.log missing"
}

# ----------------------------
# CHECK HARVESTER ACTIVITY
# ----------------------------
Write-Host "`n[HARVESTER]"

try {
    $size = (Get-Item $logFile).Length
    if ($size -gt 0) {
        Write-Host "PASS: Log file active"
    } else {
        Write-Host "WARN: Log file empty"
    }
} catch {
    Write-Host "FAIL: Cannot read log file"
}

# ----------------------------
# API CHECKS
# ----------------------------
Write-Host "`n[API]"

function Test-API($url, $name) {
    try {
        $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        if ($res.StatusCode -eq 200) {
            Write-Host "PASS: $name"
        } else {
            Write-Host "FAIL: $name returned $($res.StatusCode)"
        }
    } catch {
        Write-Host "FAIL: $name not reachable"
    }
}

Test-API "$base/api/system" "System API"
Test-API "$base/api/decision?partNumber=LR1234" "Decision API"

# ----------------------------
# FRONTEND CHECK
# ----------------------------
Write-Host "`n[FRONTEND]"

Test-API "$base/parts" "Parts Page"
Test-API "$base/admin" "Admin Page"

# ----------------------------
# SUMMARY
# ----------------------------
Write-Host "`n====================================="
Write-Host "VALIDATION COMPLETE"
Write-Host "====================================="