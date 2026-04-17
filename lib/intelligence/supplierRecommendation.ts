// JustDefenders ©
// File: /lib/intelligence/supplierRecommendation.ts
// Timestamp: 30 March 2026 04:20

type Benchmark = {
  part_id: string
  supplier_id: string
  price: number
  market_avg: number
  diff_percent: number
  position: 'cheapest' | 'mid' | 'expensive'
}

type SupplierRank = {
  supplier_id: string
  supplier_score: number
}

export function recommendSuppliers({
  benchmarks,
  rankings,
}: {
  benchmarks: Benchmark[]
  rankings: SupplierRank[]
}) {
  const partMap: Record<string, Benchmark[]> = {}
  const rankingMap: Record<string, SupplierRank> = {}

  rankings.forEach((r) => {
    rankingMap[r.supplier_id] = r
  })

  benchmarks.forEach((b) => {
    if (!partMap[b.part_id]) partMap[b.part_id] = []
    partMap[b.part_id].push(b)
  })

  const results: any[] = []

  Object.entries(partMap).forEach(([part_id, suppliers]) => {
    let best: any = null

    suppliers.forEach((s) => {
      const rank = rankingMap[s.supplier_id]
      if (!rank) return

      // price position score
      let positionScore = 50
      if (s.position === 'cheapest') positionScore = 100
      if (s.position === 'expensive') positionScore = 0

      // advantage score (negative diff = cheaper)
      const advantageScore = Math.max(0, 100 - Math.abs(s.diff_percent))

      const finalScore =
        rank.supplier_score * 0.5 +
        positionScore * 0.3 +
        advantageScore * 0.2

      if (!best || finalScore > best.finalScore) {
        best = {
          part_id,
          supplier_id: s.supplier_id,
          price: s.price,
          market_avg: s.market_avg,
          diff_percent: s.diff_percent,
          supplier_score: rank.supplier_score,
          finalScore: Math.round(finalScore),
        }
      }
    })

    if (best) {
      let decision = 'good'

      if (best.diff_percent < -10) decision = 'buy_now'
      else if (best.diff_percent > 15) decision = 'avoid'

      results.push({
        ...best,
        decision,
      })
    }
  })

  return results.sort((a, b) => b.finalScore - a.finalScore)
}