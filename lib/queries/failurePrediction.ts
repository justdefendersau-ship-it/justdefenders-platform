// JustDefenders ©
// File: /lib/queries/failurePrediction.ts
// Timestamp: 30 March 2026 00:45

import { createClient } from '@supabase/supabase-js'
import { predictFailures } from '@/lib/intelligence/failurePrediction'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getFailurePredictions() {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('vehicle_id, part_id, created_at')
    .not('part_id', 'is', null)

  if (error) throw error

  return predictFailures(data)
}