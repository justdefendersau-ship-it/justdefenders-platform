// JustDefenders ©
// File: /lib/queries/fleetRisk.ts
// Timestamp: 30 March 2026 02:25

import { calculateFleetRisk } from '@/lib/intelligence/fleetRisk'
import { getFailurePredictionsOdo } from './failurePredictionOdo'
import { getFuelTrends } from './fuelTrends'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getFleetRisk() {
  const failures = await getFailurePredictionsOdo()
  const fuelRaw = await getFuelTrends()

  // collapse fuel → latest per vehicle
  const fuelMap: Record<string, any> = {}

  fuelRaw.forEach((f: any) => {
    fuelMap[f.vehicle_id] = f
  })

  const fuel = Object.values(fuelMap).map((f: any) => ({
    vehicle_id: f.vehicle_id,
    anomaly: f.anomaly,
  }))

  // service detection
  const { data: activity } = await supabase
    .from('activity_logs')
    .select('vehicle_id, created_at')

  const serviceMap: Record<string, string> = {}

  activity?.forEach((a) => {
    if (
      !serviceMap[a.vehicle_id] ||
      new Date(a.created_at) > new Date(serviceMap[a.vehicle_id])
    ) {
      serviceMap[a.vehicle_id] = a.created_at
    }
  })

  const now = new Date()

  const service = Object.entries(serviceMap).map(
    ([vehicle_id, lastDate]) => {
      const days =
        (now.getTime() - new Date(lastDate).getTime()) /
        (1000 * 60 * 60 * 24)

      return {
        vehicle_id,
        overdue: days > 180,
      }
    }
  )

  return calculateFleetRisk({
    failures,
    fuel,
    service,
  })
}