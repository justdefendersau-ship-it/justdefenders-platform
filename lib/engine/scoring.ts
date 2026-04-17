# ==================================================================================================
# File: C:\dev\justdefenders\lib\engine\scoring.ts
# Timestamp: 13 April 2026 14:20
# Purpose: Supplier scoring (price + reliability)
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\lib\engine" | Out-Null

@'
export function scoreSupplier(item: any) {

  let score = 0;

  // PRICE (lower = better)
  score += 100 - (item.totalAUD || 100);

  // REGION BONUS
  if (item.region === "AU") score += 20;

  // OEM BONUS
  if (item.type === "oem") score += 10;

  return score;
}
'@ | Set-Content -Path "C:\dev\justdefenders\lib\engine\scoring.ts" -Encoding UTF8