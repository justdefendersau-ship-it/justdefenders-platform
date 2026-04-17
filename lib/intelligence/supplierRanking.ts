// JustDefenders ©
// File: /lib/intelligence/supplierRanking.ts
// Timestamp: 30 March 2026 03:50

type Benchmark = {
  supplier_id: string
  part_id: string
  price: number
  market_avg: number
  diff_percent: number
  position: 'cheapest' | 'mid' | 'expensive'
}

type Supplier = {
  id: string
  rating: number
}

export function rankSuppliers({
  benchmarks,
  suppliers,
}: {
  benchmarks: Benchmark[]
  suppliers: Supplier[]
}) {
  const supplierMap: Record<string, any> = {}

  // initialise suppliers
  suppliers.forEach((s) => {
    supplierMap[s.id] = {
      supplier_id: s.id,
      rating: s.rating || 0,
      prices: [],
    }
  })

  // attach pricing data
  benchmarks.forEach((b) => {
    if (!supplierMap[b.supplier_id]) return
    supplierMap[b.supplier_id].prices.push(b)
  })

  const results: any[] = []

  Object.values(supplierMap).forEach((s: any) => {
    if (!s.prices.length) return

    // average price competitiveness (lower diff = better)
    const avgDiff =
      s.prices.reduce((sum: number, p: Benchmark) => sum + p.diff_percent, 0) /
      s.prices.length

    // normalise price score (inverse of diff)
    const priceScore = Math.max(0, 100 - Math.abs(avgDiff))

    // rating score (0–100)
    const ratingScore = Math.min((s.rating || 0) * 20, 100)

    // weighted score
    const score = priceScore * 0.6 + ratingScore * 0.4

    let tier = 'C'
    if (score > 80) tier = 'A'
    else if (score > 60) tier = 'B'

    results.push({
      supplier_id: s.supplier_id,
      avg_price_diff: Number(avgDiff.toFixed(2)),
      price_score: Math.round(priceScore),
      rating_score: Math.round(ratingScore),
      supplier_score: Math.round(score),
      tier,
    })
  })

  return results.sort((a, b) => b.supplier_score - a.supplier_score)
}