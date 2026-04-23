require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(cors())

// --------------------------------------------------------------------------------------
// SUPABASE
// --------------------------------------------------------------------------------------

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// --------------------------------------------------------------------------------------
// LOAD JLR CACHE
// --------------------------------------------------------------------------------------

let jlrCache = []

try {
  const raw = fs.readFileSync('../data/jlrCache.json', 'utf-8')
  const clean = raw.replace(/^\uFEFF/, '')
  const parsed = JSON.parse(clean)

  jlrCache = Array.isArray(parsed)
    ? parsed
    : Object.keys(parsed).map(k => ({
        partNumber: k,
        ...parsed[k]
      }))

} catch (err) {
  console.log('JLR cache load failed:', err.message)
}

// --------------------------------------------------------------------------------------
// LOOKUP
// --------------------------------------------------------------------------------------

function lookupPart(query) {

  const q = query.toLowerCase()

  const match = jlrCache.find(p =>
    p.description &&
    p.description.toLowerCase().includes(q)
  )

  if (match) {
    return {
      partNumber: match.partNumber,
      description: match.description,
      image: match.imageUrl || null,
      source: 'JLR Cache'
    }
  }

  return {
    partNumber: 'UNKNOWN',
    description: query,
    image: null,
    source: 'fallback'
  }
}

// --------------------------------------------------------------------------------------
// SUPPLIERS
// --------------------------------------------------------------------------------------

async function getSuppliers() {

  const { data, error } = await supabase
    .from('suppliers')
    .select('*')

  if (error) {
    console.log('Supabase error:', error.message)
    return []
  }

  return data || []
}

// --------------------------------------------------------------------------------------
// SCORING
// --------------------------------------------------------------------------------------

function scoreSupplier(supplier, index) {

  const price = 200 + (index * 20)

  let score = 0
  let reasons = []

  score += Math.max(0, 200 - price)
  reasons.push('Competitive price')

  if (supplier.country === 'AU') {
    score += 50
    reasons.push('Local supplier')
  }

  if (supplier.type === 'both') {
    score += 20
    reasons.push('Pickup available')
  }

  return { price, score, reasons }
}

// --------------------------------------------------------------------------------------
// API
// --------------------------------------------------------------------------------------

app.get('/api/parts', async (req, res) => {

  const query = req.query.q || ''
  const part = lookupPart(query)
  const suppliers = await getSuppliers()

  const sortedSuppliers = [
  ...suppliers.filter(s => s.address),
  ...suppliers.filter(s => !s.address)
]

const results = sortedSuppliers.slice(0, 5).map((s, i) => {

    const scoring = scoreSupplier(s, i)

    // SAFE ADDRESS HANDLING
    const address =
      s.address ||
      s.Address ||
      s.full_address ||
      s.location ||
      null

    const mapLink = address
      ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address)
      : null

    return {
      supplier: s.name,
      partNumber: part.partNumber,
      partName: part.description,
      image: part.image,
      source: part.source,

      price: scoring.price,
      score: scoring.score,
      reasons: scoring.reasons,

      url: s.website || '#',

      map: mapLink
    }
  })

  results.sort((a, b) => b.score - a.score)

  if (results.length > 0) {
    results[0].best = true
  }

  res.json({ results })
})

// --------------------------------------------------------------------------------------

app.listen(4000, () => {
  console.log('API running: http://localhost:4000')
})

