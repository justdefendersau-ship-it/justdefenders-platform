# ======================================================================================
# Timestamp: 19 April 2026 17:00
# JustDefenders
# File: C:\dev\justdefenders\scripts\fix-logos-clean.ps1
# Description:
# Cleanly removes duplicate supplierLogos and inserts one correct version
# ======================================================================================

Write-Host ""
Write-Host "Fixing supplier logos..." -ForegroundColor Cyan

$file = "C:\dev\justdefenders\frontend\app\dashboard\page.tsx"

# Backup
Copy-Item $file "$file.pre_logo_clean_$(Get-Date -Format yyyyMMdd_HHmmss)" -Force

$text = Get-Content $file -Raw

# --------------------------------------------------------------------------------------
# REMOVE ALL EXISTING supplierLogos BLOCKS
# --------------------------------------------------------------------------------------

$text = [regex]::Replace(
  $text,
  'const supplierLogos[\s\S]*?\};',
  '',
  'Singleline'
)

# --------------------------------------------------------------------------------------
# INSERT CLEAN VERSION ONCE
# --------------------------------------------------------------------------------------

$logoBlock = @"

const supplierLogos:any = {
  "Repco": "/logos/repco.svg",
  "Supercheap Auto": "/logos/supercheap.svg",
  "eBay": "/logos/ebay.svg",
  "JLR": "/logos/jlr.svg"
};

"@

$text = $text -replace 'export default function Dashboard\(\) \{', "export default function Dashboard() {`n$logoBlock"

# --------------------------------------------------------------------------------------
# WRITE FILE
# --------------------------------------------------------------------------------------

[System.IO.File]::WriteAllText(
  $file,
  $text,
  (New-Object System.Text.UTF8Encoding($false))
)

Write-Host ""
Write-Host "supplierLogos fixed"
Write-Host ""
