// JustDefenders ©
// File: /lib/intelligence/fleetRisk.ts
// Timestamp: 30 March 2026 02:20

type FailurePrediction = {
  vehicle_id: string
  probability: number
}

type FuelData = {
  vehicle_id: string
  anomaly: 'normal' | 'warning' | 'critical'
}

type ServiceData = {
  vehicle_id: string
  overdue: boolean
}

export function calculateFleetRisk({
  failures,
  fuel,
  service,
}: {
  failures: FailurePrediction[]
  fuel: FuelData[]
  service: ServiceData[]
}) {
  const vehicleMap: Record<string, any> = {}

  // FAILURE SCORE (0–100)
  failures.forEach((f) => {
    if (!vehicleMap[f.vehicle_id]) vehicleMap[f.vehicle_id] = {}
    vehicleMap[f.vehicle_id].failure = f.probability
  })

  // FUEL SCORE
  fuel.forEach((f) => {
    if (!vehicleMap[f.vehicle_id]) vehicleMap[f.vehicle_id] = {}

    let score = 0
    if (f.anomaly === 'warning') score = 50
    if (f.anomaly === 'critical') score = 100

    vehicleMap[f.vehicle_id].fuel = score
  })

  // SERVICE SCORE
  service.forEach((s) => {
    if (!vehicleMap[s.vehicle_id]) vehicleMap[s.vehicle_id] = {}
    vehicleMap[s.vehicle_id].service = s.overdue ? 100 : 0
  })

  const results: any[] = []

  Object.entries(vehicleMap).forEach(([vehicle_id, v]) => {
    const failure = v.failure || 0
    const fuel = v.fuel || 0
    const service = v.service || 0

    // supplier reserved for future
    const supplier = 0

    const score =
      failure * 0.4 +
      fuel * 0.2 +
      service * 0.2 +
      supplier * 0.2

    let risk = 'low'
    if (score > 75) risk = 'critical'
    else if (score > 50) risk = 'high'
    else if (score > 25) risk = 'medium'

    results.push({
      vehicle_id,
      risk_score: Math.round(score),
      risk,
    })
  })

  // sort highest risk first
  return results.sort((a, b) => b.risk_score - a.risk_score)
}