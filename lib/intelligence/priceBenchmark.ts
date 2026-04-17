// JustDefenders ©
// File: /lib/intelligence/priceBenchmark.ts
// Timestamp: 30 March 2026 03:20

type PriceRecord = {
  part_id: string
  supplier_id: string
  price: number
}

export function benchmarkPrices(records: PriceRecord[]) {
  const partMap: Record<string, PriceRecord[]> = {}

  // group by part
  records.forEach((r) => {
    if (!partMap[r.part_id]) partMap[r.part_id] = []
    partMap[r.part_id].push(r)
  })

  const results: any[] = []

  Object.entries(partMap).forEach(([part_id, prices]) => {
    if (prices.length < 2) return

    const avg =
      prices.reduce((sum, p) => sum + p.price, 0) / prices.length

    const min = Math.min(...prices.map((p) => p.price))
    const max = Math.max(...prices.map((p) => p.price))

    prices.forEach((p) => {
      const diff = ((p.price - avg) / avg) * 100

      let position = 'mid'
      if (p.price === min) position = 'cheapest'
      else if (p.price === max) position = 'expensive'

      results.push({
        part_id,
        supplier_id: p.supplier_id,
        price: p.price,
        market_avg: Number(avg.toFixed(2)),
        diff_percent: Number(diff.toFixed(2)),
        position,
      })
    })
  })

  return results
}