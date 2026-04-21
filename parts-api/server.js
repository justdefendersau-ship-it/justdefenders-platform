const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// --------------------------------
// VIN DECODER (MOCK - UPGRADE LATER)
// --------------------------------
function decodeVin(vin) {

  if (!vin) return null

  if (vin.includes('001')) {
    return {
      model: 'Defender 110',
      engine: '2.2 TDCi',
      year: '2012–2016'
    }
  }

  if (vin.includes('002')) {
    return {
      model: 'Defender 90',
      engine: '2.4 TDCi',
      year: '2007–2012'
    }
  }

  return {
    model: 'Unknown',
    engine: 'Unknown',
    year: 'Unknown'
  }
}

app.get('/api/parts', async (req, res) => {

  const query = req.query.q || ''
  const vin = req.query.vin || null

  const vehicle = decodeVin(vin)

  // --------------------------------
  // MOCK DATA (WITH COMPATIBILITY)
  // --------------------------------
  let data = [
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 320, compatible: ['DEF-110-001'] },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 302, compatible: ['DEF-110-001'] },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 334, compatible: ['DEF-110-002'] },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 317, compatible: ['DEF-110-001'] },
    { supplier: 'Alt Supplier', name: 'Starter Motor', price: 360, compatible: ['DEF-110-003'] }
  ]

  // --------------------------------
  // SEARCH FILTER
  // --------------------------------
  data = data.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  // --------------------------------
  // VIN FILTER (SMART)
  // --------------------------------
  let filtered = data

  if (vin) {
    const matches = data.filter(p =>
      p.compatible && p.compatible.includes(vin)
    )

    if (matches.length > 0) {
      filtered = matches
    }
  }

  // --------------------------------
  // NORMALISE + CONFIDENCE
  // --------------------------------
  let results = filtered.map(p => {

    let confidence = 50

    if (vin && p.compatible.includes(vin)) {
      confidence = 90
    }

    return {
      supplier: p.supplier,
      partNumber: p.name,
      price: Number(p.price),
      compatible: p.compatible,
      confidence,
      vehicle,
      rating: 3,
      insight: vin ? 'VIN matched' : 'General match',
      prediction: 'Stable',
      url: 'https://www.google.com/search?q=' + encodeURIComponent(p.name)
    }

  })

  // --------------------------------
  // GROUP BY SUPPLIER
  // --------------------------------
  const grouped = {}

  results.forEach(p => {
    if (!grouped[p.supplier]) grouped[p.supplier] = []
    grouped[p.supplier].push(p)
  })

  let finalResults = Object.keys(grouped).map(supplier => {

    const items = grouped[supplier]
    items.sort((a, b) => a.price - b.price)

    return {
      ...items[0],
      options: items.length
    }

  })

  // --------------------------------
  // RANKING (CONFIDENCE BOOST)
  // --------------------------------
  finalResults = finalResults.map(p => {

    let score = (p.rating * 20) - (p.price / 10)

    if (p.confidence >= 90) {
      score += 40
    }

    return { ...p, score }

  })

  finalResults.sort((a, b) => b.score - a.score)

  if (finalResults.length > 0) {
    finalResults[0].best = true
  }

  res.json({ results: finalResults })

})

app.listen(4000, () => {
  console.log('API running (VIN INTELLIGENCE + CONFIDENCE ACTIVE) on port 4000')
})
