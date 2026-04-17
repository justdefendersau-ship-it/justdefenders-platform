// JustDefenders ©
// File: /lib/queries/fuelTrends.ts
// Timestamp: 29 March 2026 23:45

import { createClient } from '@supabase/supabase-js'
import {
  calculatePercentageChange,
  detectAnomaly,
} from '@/lib/intelligence/trendUtils'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getFuelTrends() {
  const { data, error } = await supabase
    .from('fuel_logs')
    .select('vehicle_id, odometer, litres, created_at')
    .order('created_at', { ascending: true })

  if (error) throw error

  const vehicleMap: Record<string, number[]> = {}
  const results: any[] = []

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1]
    const curr = data[i]

    if (prev.vehicle_id !== curr.vehicle_id) continue

    const distance = curr.odometer - prev.odometer
    if (distance <= 0) continue

    const efficiency = distance / curr.litres

    if (!vehicleMap[curr.vehicle_id]) {
      vehicleMap[curr.vehicle_id] = []
    }

    vehicleMap[curr.vehicle_id].push(efficiency)

    // baseline = average of last 5
    const history = vehicleMap[curr.vehicle_id].slice(-5)
    const baseline =
      history.reduce((a, b) => a + b, 0) / history.length

    const prevEff = history.length > 1 ? history[history.length - 2] : efficiency

    const change = calculatePercentageChange(efficiency, prevEff)
    const anomaly = detectAnomaly(efficiency, baseline)

    results.push({
      date: curr.created_at,
      efficiency: Number(efficiency.toFixed(2)),
      change: Number(change.toFixed(2)),
      anomaly,
    })
  }

  return results
}