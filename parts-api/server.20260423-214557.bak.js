require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

// --------------------------------------------------------------------------------------
// USER LOCATION (TEMP - replace later with real GPS)
// --------------------------------------------------------------------------------------

const USER_LAT = -33.8688
const USER_LNG = 151.2093

// --------------------------------------------------------------------------------------
// SUPABASE
// --------------------------------------------------------------------------------------

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// --------------------------------------------------------------------------------------
// LOAD DATA
// --------------------------------------------------------------------------------------

const rawJLR = fs.readFileSync('../data/jlrCache.json', 'utf-8')
const cleanJLR = rawJLR.replace(/^\uFEFF/, '')
const parsedJLR = JSON.parse(cleanJLR)

const jlrCache = Array.isArray(parsedJLR)
  ? parsedJLR
  : Object.keys(parsedJLR).map(key => ({
      partNumber: key,
      ...parsedJLR[key]
    }))

const rawCompat = fs.readFileSync('../data/compatibilityMap.json', 'utf-8')
const cleanCompat = rawCompat.replace(/^\uFEFF/, '')
const compatibilityMap = JSON.parse(cleanCompat)

// --------------------------------------------------------------------------------------

const app = express()
app.use(cors())

// --------------------------------------------------------------------------------------
// DISTANCE CALCULATION
// --------------------------------------------------------------------------------------

function getDistanceKm(lat1, lon1, lat2, lon2) {

  if (!lat1 || !lon1 || !lat2 || !lon2) return null

  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round(R * c)
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

  return data
}

// --------------------------------------------------------------------------------------
// JLR LOOKUP
// --------------------------------------------------------------------------------------

function lookupJLRCache(query) {

  const q = query.toLowerCase()

  return jlrCache.find(item =>
    item.description &&
    item.description.toLowerCase().includes(q)
  )
}

// --------------------------------------------------------------------------------------
// ENRICH PART
// --------------------------------------------------------------------------------------

async function enrichPart(query) {

  const cached = lookupJLRCache(query)

  if (cached) {
    return {
      partNumber: cached.partNumber,
      description: cached.description,
      image: cached.imageUrl || null,
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
// SCORING
// --------------------------------------------------------------------------------------

function scoreSupplier(supplier, price, distance) {

  let score = 0
  let reasons = []

  // PRICE
  score += Math.max(0, 200 - price)
  reasons.push('Competitive price')

  // AU PRIORITY
  if (supplier.country === 'AU') {
    score += 50
    reasons.push('Local supplier')
  }

  // DISTANCE
  if (distance !== null) {
    score += Math.max(0, 50 - distance)

    if (distance < 20) reasons.push('Nearby pickup')
    else if (distance < 100) reasons.push('Reasonable distance')
  }

  // TYPE
  if (supplier.type === 'both') {
    score += 20
    reasons.push('Pickup available')
  } else if (supplier.type === 'online') {
    score += 5
    reasons.push('Online option')
  }

  return { score, reasons }
}

// --------------------------------------------------------------------------------------
// MAIN ENGINE
// --------------------------------------------------------------------------------------

async function getParts(query) {

  const intel = await enrichPart(query)
  const compatible = compatibilityMap[intel.partNumber] || []
  const suppliers = await getSuppliers()

  const results = suppliers.map((s, i) => {

    const price = 250 + (i * 20)

    const distance = getDistanceKm(
      USER_LAT,
      USER_LNG,
      s.lat,
      s.lng
    )

    // MAP LINK (ADDRESS FALLBACK)
    let mapLink = null

    if (s.lat && s.lng) {
      mapLink = https://www.google.com/maps?q=,
    } else if (s.address) {
      mapLink = https://www.google.com/maps/search/?api=1&query=
    }

    const scoring = scoreSupplier(s, price, distance)

    return {
      supplier: s.name,
      partNumber: intel.partNumber,
      partName: intel.description,
      image: intel.image,
      source: intel.source,
      compatible: compatible,

      price: price,
      url: s.website || '#',

      distance: distance,
      map: mapLink,

      score: scoring.score,
      reasons: scoring.reasons
    }
  })

  results.sort((a, b) => b.score - a.score)

  if (results.length > 0) {
    results[0].best = true
  }

  return results.slice(0, 6)
}

// --------------------------------------------------------------------------------------

app.get('/api/parts', async (req, res) => {

  const query = req.query.q || ''
  const results = await getParts(query)

  res.json({ results })
})

// --------------------------------------------------------------------------------------

app.listen(4000, () => {
  console.log('Parts API running on http://localhost:4000')
})
