/*
============================================================
JustDefenders
Valuation Provider Abstraction Layer
Date: 22 Feb 2026
============================================================
Supports:
- Heuristic fallback
- Redbook integration
- Future providers
============================================================
*/

type VehicleInput = {
  make: string
  model: string
  year: number
  odometer: number
}

export async function getMarketValue(
  vehicle: VehicleInput
) {

  if (process.env.REDBOOK_API_KEY) {
    return redbookProvider(vehicle)
  }

  return heuristicProvider(vehicle)
}

// -----------------------------
// Heuristic Model (Fallback)
// -----------------------------

async function heuristicProvider(
  vehicle: VehicleInput
) {

  const baseValue =
    80000 - ((2026 - vehicle.year) * 5000)

  const kmAdjustment =
    vehicle.odometer * 0.08

  const estimatedValue =
    Math.max(5000, baseValue - kmAdjustment)

  return {
    provider: "heuristic",
    estimatedValue,
    confidence: 0.6
  }
}

// -----------------------------
// Redbook Provider (Production)
// -----------------------------

async function redbookProvider(
  vehicle: VehicleInput
) {

  const response = await fetch(
    "https://api.redbook.com.au/valuation",
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.REDBOOK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vehicle)
    }
  )

  const data = await response.json()

  return {
    provider: "redbook",
    estimatedValue: data.marketValue,
    confidence: 0.95
  }
}/*
============================================================
JustDefenders
Valuation Provider Abstraction Layer
Date: 22 Feb 2026
============================================================
Supports:
- Heuristic fallback
- Redbook integration
- Future providers
============================================================
*/

type VehicleInput = {
  make: string
  model: string
  year: number
  odometer: number
}

export async function getMarketValue(
  vehicle: VehicleInput
) {

  if (process.env.REDBOOK_API_KEY) {
    return redbookProvider(vehicle)
  }

  return heuristicProvider(vehicle)
}

// -----------------------------
// Heuristic Model (Fallback)
// -----------------------------

async function heuristicProvider(
  vehicle: VehicleInput
) {

  const baseValue =
    80000 - ((2026 - vehicle.year) * 5000)

  const kmAdjustment =
    vehicle.odometer * 0.08

  const estimatedValue =
    Math.max(5000, baseValue - kmAdjustment)

  return {
    provider: "heuristic",
    estimatedValue,
    confidence: 0.6
  }
}

// -----------------------------
// Redbook Provider (Production)
// -----------------------------

async function redbookProvider(
  vehicle: VehicleInput
) {

  const response = await fetch(
    "https://api.redbook.com.au/valuation",
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.REDBOOK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vehicle)
    }
  )

  const data = await response.json()

  return {
    provider: "redbook",
    estimatedValue: data.marketValue,
    confidence: 0.95
  }
}