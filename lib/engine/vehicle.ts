# ==================================================================================================
# File: C:\dev\justdefenders\lib\engine\vehicle.ts
# Timestamp: 13 April 2026 14:35
# Purpose: VIN decoder upgrade + AU rego lookup (extensible)
# JustDefenders ©
# ==================================================================================================

@'
export function decodeVIN(vin: string) {

  if (!vin || vin.length < 10) return null;

  const yearMap: any = {
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014,
    F: 2015, G: 2016, H: 2017, J: 2018, K: 2019,
    L: 2020, M: 2021, N: 2022, P: 2023
  };

  return {
    manufacturer: vin.substring(0,3),
    model: vin.includes("DEF") ? "Defender" : "Unknown",
    year: yearMap[vin[9]] || 2000,
    engine: vin[7]
  };
}

// ----------------------------------------------------------------------------------------------
// REGO LOOKUP (AU STRUCTURE — API READY)
// ----------------------------------------------------------------------------------------------

export async function lookupRego(rego: string, state: string) {

  console.log("🔍 Rego lookup:", rego, state);

  // Placeholder (real APIs require paid/state access)
  return {
    rego,
    state,
    model: "Defender",
    year: 2012,
    engine: "2.2 TDCi",
    note: "Simulated result (API integration ready)"
  };
}

// ----------------------------------------------------------------------------------------------
// UNIFIED VEHICLE CONTEXT
// ----------------------------------------------------------------------------------------------

export async function buildVehicleContext(input: any) {

  if (input.vin) {
    return decodeVIN(input.vin);
  }

  if (input.rego) {
    return await lookupRego(input.rego, input.state || "NSW");
  }

  return {
    model: input.model || "Defender",
    year: input.year || 2000
  };
}
'@ | Set-Content -Path "C:\dev\justdefenders\lib\engine\vehicle.ts" -Encoding UTF8

Write-Host "✅ VIN + REGO engine upgraded"