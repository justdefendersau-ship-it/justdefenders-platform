// JustDefenders ©
// File: /lib/queries/failurePredictionOdo.ts
// Timestamp: 30 March 2026 02:00

import { createClient } from '@supabase/supabase-js'
import { mapFailuresToOdometer } from '@/lib/intelligence/odometerMapping'
import { predictFailuresOdometer } from '@/lib/intelligence/failurePredictionOdo'
import { getLatestOdometers } from '@/lib/queries/getLatestOdometer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getFailurePredictionsOdo() {
  const { data: failures } = await supabase
    .from('activity_logs')
    .select('vehicle_id, part_id, created_at')
    .not('part_id', 'is', null)

  const { data: fuelLogs } = await supabase
    .from('fuel_logs')
    .select('vehicle_id, odometer, created_at')

  const latestOdometers = await getLatestOdometers()

  const mapped = mapFailuresToOdometer(
    failures || [],
    fuelLogs || []
  )

  return predictFailuresOdometer(mapped, latestOdometers)
}