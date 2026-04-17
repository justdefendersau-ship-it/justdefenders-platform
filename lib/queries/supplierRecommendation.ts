// JustDefenders ©
// File: /lib/queries/supplierRecommendation.ts
// Timestamp: 30 March 2026 04:25

import { recommendSuppliers } from '@/lib/intelligence/supplierRecommendation'
import { getPriceBenchmark } from './priceBenchmark'
import { getSupplierRanking } from './supplierRanking'

export async function getSupplierRecommendations() {
  const benchmarks = await getPriceBenchmark()
  const rankings = await getSupplierRanking()

  return recommendSuppliers({
    benchmarks,
    rankings,
  })
}