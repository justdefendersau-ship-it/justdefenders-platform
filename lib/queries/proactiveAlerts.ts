// JustDefenders ©
// File: /lib/queries/proactiveAlerts.ts
// Timestamp: 30 March 2026 02:55

import { generateProactiveAlerts } from '@/lib/intelligence/proactiveAlerts'
import { getFailurePredictionsOdo } from './failurePredictionOdo'
import { getFuelTrends } from './fuelTrends'
import { getFleetRisk } from './fleetRisk'

export async function getProactiveAlerts() {
  const failures = await getFailurePredictionsOdo()
  const fuelRaw = await getFuelTrends()
  const fleetRisk = await getFleetRisk()

  // latest fuel per vehicle
  const fuelMap: Record<string, any> = {}

  fuelRaw.forEach((f: any) => {
    fuelMap[f.vehicle_id] = f
  })

  const fuel = Object.values(fuelMap)

  return generateProactiveAlerts({
    failures,
    fuel,
    fleetRisk,
  })
}