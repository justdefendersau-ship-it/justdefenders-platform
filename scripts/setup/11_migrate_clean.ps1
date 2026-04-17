$SOURCE = "C:\Users\sbarc\Documents\DefenderPartsFinder\justdefenders\platform"
$TARGET = "C:\dev\justdefenders"

Write-Host "=== Clean Migration (Excluding node_modules) ==="

# Validate source
if (!(Test-Path "$SOURCE\package.json")) {
    Write-Host "? Source invalid — package.json missing"
    exit
}

# Clean target (keep scripts folder)
Get-ChildItem $TARGET | Where-Object {
    $_.Name -ne "scripts"
} | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copy excluding heavy folders
robocopy $SOURCE $TARGET /E /XD node_modules .next dist build

# Verify
if (Test-Path "$TARGET\package.json") {
    Write-Host "? Migration successful"
} else {
    Write-Host "? Migration failed"
}
