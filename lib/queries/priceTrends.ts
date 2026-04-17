// JustDefenders ©
// File: /lib/queries/priceTrends.ts
// Timestamp: 29 March 2026 23:48

import { createClient } from '@supabase/supabase-js'
import { calculatePercentageChange } from '@/lib/intelligence/trendUtils'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getPriceTrends() {
  const { data, error } = await supabase
    .from('part_prices')
    .select('price, created_at')
    .order('created_at', { ascending: true })

  if (error) throw error

  const results: any[] = []

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1]
    const curr = data[i]

    const change = calculatePercentageChange(curr.price, prev.price)

    results.push({
      date: curr.created_at,
      price: curr.price,
      change: Number(change.toFixed(2)),
    })
  }

  return results
}