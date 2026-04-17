# ======================================================================================
# JustDefenders ©
# File: /scripts/git-auto-backup.ps1
# Description: Stable automatic Git backup (no submodule errors)
# ======================================================================================

$repo = "C:\dev\justdefenders"

cd $repo

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$status = git status --porcelain

if ($status) {

    git add -A

    git commit -m "Auto backup - $timestamp"

    git push origin main

    Write-Output "[$timestamp] Backup committed and pushed"

} else {

    Write-Output "[$timestamp] No changes detected"

}