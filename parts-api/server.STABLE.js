const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// ======================================================================================
// JUSTDEFENDERS PARTS API (CLEAN VERSION)
// ======================================================================================

app.get('/api/parts', async (req, res) => {

  try {

    // ------------------------------------------------------------------
    // BASE RESULT (simulating your existing intelligence output)
    // ------------------------------------------------------------------
    const baseResults = [{
      supplier: 'Rovacraft',
      partNumber: 'Starter Motor',
      price: 302,
      confidence: 50,
      vehicle: null,
      rating: 3,
      options: 3,
      explanation: 'Lowest price + strong VIN compatibility',
      trend: 'stable',
      change: '0.0',
      buySignal: 'Hold'
    }]

    // ------------------------------------------------------------------
    // MULTI SUPPLIER EXPANSION (SAFE)
    // ------------------------------------------------------------------
    const suppliers = [
      { name: 'Rovacraft', factor: 1.00 },
      { name: 'Burson', factor: 1.04 },
      { name: 'Repco', factor: 1.08 },
      { name: 'LR Direct', factor: 0.97 }
    ]

    let expanded = []

    baseResults.forEach(r => {
      suppliers.forEach(s => {

        const newPrice = Math.round(r.price * s.factor)

        expanded.push({
          ...r,
          supplier: s.name,
          price: newPrice,
          allOptions: [
            { supplier: s.name, price: newPrice },
            { supplier: s.name, price: newPrice + 10 },
            { supplier: s.name, price: newPrice + 18 }
          ]
        })

      })
    })

    // ------------------------------------------------------------------
    // BEST VALUE CALCULATION
    // ------------------------------------------------------------------
    const minPrice = Math.min(...expanded.map(x => x.price))

    expanded = expanded.map(x => ({
      ...x,
      best: x.price === minPrice
    }))

    // ------------------------------------------------------------------
    // FINAL RESPONSE
    // ------------------------------------------------------------------
    res.json({ results: expanded })

  } catch (err) {
    console.error('API ERROR:', err)
    res.status(500).json({ error: 'Server error' })
  }

})

// ======================================================================================
// START SERVER
// ======================================================================================

app.listen(4000, () => {
  console.log('API running (MULTI-SUPPLIER MODE)')
})
