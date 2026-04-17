// JustDefenders ©
// File: /lib/queries/getLatestOdometer.ts
// Timestamp: 30 March 2026 01:50

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getLatestOdometers() {
  const { data, error } = await supabase
    .from('fuel_logs')
    .select('vehicle_id, odometer, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error

  const latestMap: Record<string, number> = {}

  data.forEach((row) => {
    if (!latestMap[row.vehicle_id]) {
      latestMap[row.vehicle_id] = row.odometer
    }
  })

  return latestMap
}