// JustDefenders ©
// File: /lib/queries/supplierRanking.ts
// Timestamp: 30 March 2026 03:55

import { createClient } from '@supabase/supabase-js'
import { getPriceBenchmark } from './priceBenchmark'
import { rankSuppliers } from '@/lib/intelligence/supplierRanking'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getSupplierRanking() {
  const benchmarks = await getPriceBenchmark()

  const { data: suppliers, error } = await supabase
    .from('suppliers')
    .select('id, rating')

  if (error) throw error

  return rankSuppliers({
    benchmarks,
    suppliers: suppliers || [],
  })
}