Write-Host "Running system tests..."

Write-Host "`nHealth:"
Invoke-RestMethod http://127.0.0.1:4000/health

Write-Host "`nPlatform:"
Invoke-RestMethod http://127.0.0.1:4000/platform

Write-Host "`nStatus:"
Invoke-RestMethod http://127.0.0.1:4000/status

Write-Host "`nAnalytics:"
Invoke-RestMethod http://127.0.0.1:4000/analytics
