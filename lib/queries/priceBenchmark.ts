// JustDefenders ©
// File: /lib/queries/priceBenchmark.ts
// Timestamp: 30 March 2026 03:25

import { createClient } from '@supabase/supabase-js'
import { benchmarkPrices } from '@/lib/intelligence/priceBenchmark'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getPriceBenchmark() {
  const { data, error } = await supabase
    .from('part_prices')
    .select('part_id, supplier_id, price')

  if (error) throw error

  return benchmarkPrices(data || [])
}