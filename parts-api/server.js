const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/api/parts', async (req, res) => {

  const query = req.query.q || ''

  // ------------------------------
  // MOCK DATA (SAFE BASELINE)
  // Replace later with DB call
  // ------------------------------
  let data = [
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 320 },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 302 },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 334 },
    { supplier: 'Rovacraft', name: 'Starter Motor', price: 317 },
    { supplier: 'Unknown', name: 'Starter Motor', price: null }
  ]

  // ------------------------------
  // FILTER BY QUERY
  // ------------------------------
  data = data.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  // ------------------------------
  // CLEAN + NORMALISE
  // ------------------------------
  let results = data
    .map(p => ({
      supplier: p.supplier || 'Unknown',
      partNumber: p.name,
      price: p.price ? Number(p.price) : null,
      rating: 3,
      insight: 'Fair price',
      prediction: 'Monitor price',
      url: 'https://www.google.com/search?q=' + encodeURIComponent(p.name)
    }))
    .filter(p => p.price !== null)

  // ------------------------------
  // GROUP BY SUPPLIER
  // ------------------------------
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

  // ------------------------------
  // RANKING
  // ------------------------------
  finalResults = finalResults.map(p => {
    const score = (p.rating * 20) - (p.price / 10)
    return { ...p, score }
  })

  finalResults.sort((a, b) => b.score - a.score)

  if (finalResults.length > 0) {
    finalResults[0].best = true
  }

  res.json({ results: finalResults })

})

app.listen(4000, () => {
  console.log('API running (STABLE BASELINE) on port 4000')
})
