// JustDefenders ©
// File: /lib/queries/failureTrends.ts
// Timestamp: 29 March 2026 23:50

import { createClient } from '@supabase/supabase-js'
import { calculatePercentageChange } from '@/lib/intelligence/trendUtils'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getFailureTrends() {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('created_at')
    .order('created_at', { ascending: true })

  if (error) throw error

  const map: Record<string, number> = {}

  data.forEach((row) => {
    const day = row.created_at.split('T')[0]
    map[day] = (map[day] || 0) + 1
  })

  const entries = Object.entries(map)

  return entries.map(([date, count], i) => {
    const prev = entries[i - 1]?.[1] || count
    const change = calculatePercentageChange(count, prev)

    return {
      date,
      failures: count,
      change: Number(change.toFixed(2)),
    }
  })
}