const express = require('express')
const cors = require('cors')
const fs = require('fs')

// --------------------------------------------------------------------------------------
// LOAD JLR CACHE (BOM SAFE)
// --------------------------------------------------------------------------------------

const rawJLR = fs.readFileSync('../data/jlrCache.json', 'utf-8')
const cleanJLR = rawJLR.replace(/^\uFEFF/, '')
const parsedJLR = JSON.parse(cleanJLR)

// Support both object + array formats
const jlrCache = Array.isArray(parsedJLR)
  ? parsedJLR
  : Object.keys(parsedJLR).map(key => ({
      partNumber: key,
      ...parsedJLR[key]
    }))

// --------------------------------------------------------------------------------------
// LOAD COMPATIBILITY MAP (BOM SAFE)
// --------------------------------------------------------------------------------------

const rawCompat = fs.readFileSync('../data/compatibilityMap.json', 'utf-8')
const cleanCompat = rawCompat.replace(/^\uFEFF/, '')
const compatibilityMap = JSON.parse(cleanCompat)

// --------------------------------------------------------------------------------------
// LOAD LR WORKSHOP CONNECTOR
// --------------------------------------------------------------------------------------

const lrLookup = require('../backend/lrWorkshopConnector.cjs')

// --------------------------------------------------------------------------------------

const app = express()
app.use(cors())

// --------------------------------------------------------------------------------------
// JLR LOOKUP
// --------------------------------------------------------------------------------------

function lookupJLRCache(query) {

  const q = query.toLowerCase()

  // Try description match
  let match = jlrCache.find(item =>
    item.description &&
    item.description.toLowerCase().includes(q)
  )

  if (match) return match

  // Try reverse match (query inside description words)
  match = jlrCache.find(item =>
    item.description &&
    q.includes(item.description.toLowerCase())
  )

  if (match) return match

  // Try partial word match
  const words = q.split(' ')
  match = jlrCache.find(item =>
    item.description &&
    words.some(w => item.description.toLowerCase().includes(w))
  )

  if (match) return match

  return null
}

// --------------------------------------------------------------------------------------
// ENRICHMENT ENGINE
// --------------------------------------------------------------------------------------

async function enrichPart(query) {

  // 1️⃣ JLR CACHE
  const cached = lookupJLRCache(query)

  if (cached) {
    console.log('JLR CACHE HIT:', cached.partNumber)

    return {
      partNumber: cached.partNumber || 'UNKNOWN',
      description: cached.description || query,
      image: cached.image || null,
      source: 'JLR Cache'
    }
  }

  // 2️⃣ LR WORKSHOP FALLBACK
  try {
    const lr = await lrLookup.lookupPart(query)

    return {
      partNumber: lr?.partNumber || 'UNKNOWN',
      description: lr?.description || query,
      image: null,
      source: 'lrWorkshop'
    }

  } catch (err) {

    console.log('lrWorkshop failed:', err.message)

    return {
      partNumber: 'UNKNOWN',
      description: query,
      image: null,
      source: 'fallback'
    }
  }
}

// --------------------------------------------------------------------------------------
// MAIN ENGINE
// --------------------------------------------------------------------------------------

async function getParts(query) {

  const intel = await enrichPart(query)

  const compatible = compatibilityMap[intel.partNumber] || []

  return [

    {
      supplier: 'Repco',
      partNumber: intel.partNumber,
      partName: intel.description,
      image: intel.image,
      source: intel.source,
      compatible: compatible,
      price: 320,
      url: 'https://www.repco.com.au/',
      options: 3,
      allOptions: [
        { supplier: 'Repco', price: 320, url: 'https://www.repco.com.au/' },
        { supplier: 'Repco', price: 295, url: 'https://www.repco.com.au/' },
        { supplier: 'Repco', price: 340, url: 'https://www.repco.com.au/' }
      ]
    },

    {
      supplier: 'Burson',
      partNumber: intel.partNumber + 'G',
      partName: 'OEM Equivalent',
      image: intel.image,
      source: intel.source,
      compatible: compatible,
      price: 410,
      url: 'https://www.burson.com.au/',
      options: 2,
      allOptions: [
        { supplier: 'Burson', price: 410, url: 'https://www.burson.com.au/' },
        { supplier: 'Burson', price: 450, url: 'https://www.burson.com.au/' }
      ]
    },

    {
      supplier: 'Rovacraft',
      partNumber: intel.partNumber + 'H',
      partName: 'Updated Version',
      image: intel.image,
      source: intel.source,
      compatible: compatible,
      price: 360,
      url: 'https://www.rovacraft.com.au/',
      options: 2,
      allOptions: [
        { supplier: 'Rovacraft', price: 360, url: 'https://www.rovacraft.com.au/' },
        { supplier: 'Rovacraft', price: 340, url: 'https://www.rovacraft.com.au/' }
      ]
    },

    {
      supplier: 'LR Direct',
      partNumber: intel.partNumber,
      partName: 'Genuine Part',
      image: intel.image,
      source: intel.source,
      compatible: compatible,
      price: 280,
      url: 'https://www.lrdirect.com/',
      options: 2,
      allOptions: [
        { supplier: 'LR Direct', price: 280, url: 'https://www.lrdirect.com/' },
        { supplier: 'LR Direct', price: 300, url: 'https://www.lrdirect.com/' }
      ]
    }

  ]
}

// --------------------------------------------------------------------------------------
// API ROUTE
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

