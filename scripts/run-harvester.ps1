Write-Host "Running Harvester..."
node backend/harvester.cjs

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS"
} else {
    Write-Host "FAILED"
}
