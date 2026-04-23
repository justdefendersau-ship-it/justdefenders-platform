const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/api/parts', async (req, res) => {

  try {

    const basePrice = 300

    const suppliers = [

      {
        name: 'LR Direct',
        price: Math.round(basePrice * 0.97),
        confidence: 72,
        trend: 'falling',
        buySignal: 'BUY',
        explanation: 'OEM matched to VIN'
      },

      {
        name: 'Rovacraft',
        price: Math.round(basePrice * 1.00),
        confidence: 58,
        trend: 'stable',
        buySignal: 'HOLD',
        explanation: 'Aftermarket compatible'
      },

      {
        name: 'Burson',
        price: Math.round(basePrice * 1.05),
        confidence: 63,
        trend: 'stable',
        buySignal: 'HOLD',
        explanation: 'Trade supplier availability'
      },

      {
        name: 'Repco',
        price: Math.round(basePrice * 1.10),
        confidence: 64,
        trend: 'rising',
        buySignal: 'WAIT',
        explanation: 'Local stock, fast pickup'
      }

    ]

    let results = suppliers.map(s => ({
      supplier: s.name,
      partNumber: 'Starter Motor',
      price: s.price,
      confidence: s.confidence,
      trend: s.trend,
      buySignal: s.buySignal,
      explanation: s.explanation,
      rating: Math.floor(Math.random() * 2) + 3,
      options: 3,
      allOptions: [
        { supplier: s.name, price: s.price },
        { supplier: s.name, price: s.price + 10 },
        { supplier: s.name, price: s.price + 20 }
      ]
    }))

    // BEST VALUE LOGIC
    const minPrice = Math.min(...results.map(r => r.price))
    results = results.map(r => ({
      ...r,
      best: r.price === minPrice
    }))

    res.json({ results })

  } catch (err) {
    console.error('API ERROR:', err)
    res.status(500).json({ error: 'Server error' })
  }

})

app.listen(4000, () => {
  console.log('API running (REALISTIC SUPPLIERS MODE)')
})
