# ============================================================
# JustDefenders ©
# File: C:\dev\justdefenders\scripts\setup\03_env_setup.ps1
# Timestamp: 31-03-2026 13:40 (Sydney)
# Purpose: Generate .env.local for JustDefenders platform
# ============================================================

$envFile = "C:\dev\justdefenders\.env.local"

Write-Host "Creating environment file..."

@"
# JustDefenders © ENV CONFIG — 31-03-2026 13:40

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

EXPO_PUBLIC_APP_SCHEME=justdefenders
"@ | Set-Content $envFile

Write-Host "? .env.local created at $envFile"
