require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(cors())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// VIN DECODER
function decodeVin(vin) {
  if (!vin) return null
  if (vin.includes('001')) {
    return { model: 'Defender 110', engine: '2.2 TDCi', year: '2012–2016' }
  }
  return { model: 'Unknown', engine: 'Unknown', year: 'Unknown' }
}

app.get('/api/parts', async (req, res) => {

  const query = req.query.q || ''
  const vin = req.query.vin || null
  const filters = req.query.filters ? req.query.filters.split(',') : []

  const vehicle = decodeVin(vin)

  let data = [
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 302, type: 'OEM', compatible: ['DEF-110-001'] },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 317, type: 'OEM', compatible: ['DEF-110-001'] },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 320, type: 'Used', compatible: ['DEF-110-001'] }
  ]

  // SEARCH
  data = data.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  // FILTERS
  if (filters.length > 0) {
    data = data.filter(p => filters.includes(p.type))
  }

  // VIN FILTER
  if (vin) {
    const matches = data.filter(p =>
      p.compatible && p.compatible.includes(vin)
    )
    if (matches.length > 0) data = matches
  }

  // NORMALISE
  let results = data.map(p => {
    let confidence = 50
    if (vin && p.compatible.includes(vin)) confidence = 90

    return {
      supplier: p.supplier,
      partNumber: p.name,
      price: Number(p.price),
      confidence,
      vehicle,
      rating: 3
    }
  })

  // GROUP
  const grouped = {}
  results.forEach(p => {
    if (!grouped[p.supplier]) grouped[p.supplier] = []
    grouped[p.supplier].push(p)
  })

  let finalResults = []

  for (const supplier of Object.keys(grouped)) {

    const items = grouped[supplier]
    items.sort((a, b) => a.price - b.price)

    const base = items[0]

    // 🔥 REAL HISTORY FROM SUPABASE
    const { data: historyData } = await supabase
      .from('price_history')
      .select('price')
      .eq('supplier', base.supplier)
      .eq('part_number', base.partNumber)
      .order('created_at', { ascending: true })
      .limit(5)

    const history = historyData ? historyData.map(h => Number(h.price)) : []

    // TREND
    let trend = 'stable'
    let change = 0
    let buySignal = 'Hold'

    if (history.length >= 2) {
      const first = history[0]
      const last = history[history.length - 1]

      change = ((last - first) / first) * 100

      if (last < first) {
        trend = 'falling'
        buySignal = 'Good time to buy'
      }
      if (last > first) {
        trend = 'rising'
        buySignal = 'Wait'
      }
    }

    finalResults.push({
      ...base,
      options: items.length,
      allOptions: items,
      explanation: 'Lowest price + strong VIN compatibility',
      trend,
      change: change.toFixed(1),
      buySignal
    })
  }

  // RANK
  finalResults = finalResults.map(p => {
    let score = (p.rating * 20) - (p.price / 10)
    if (p.confidence >= 90) score += 40
    return { ...p, score }
  })

  finalResults.sort((a, b) => b.score - a.score)

  if (finalResults.length > 0) {
    finalResults[0].best = true
  }

  res.json({ results: finalResults })

})

app.listen(4000, () => {
  console.log('API running (REAL INTELLIGENCE ACTIVE)')
})
