const fetch = require('node-fetch')
const cheerio = require('cheerio')

// --------------------------------------------------------------------------------------
// CONFIG
// --------------------------------------------------------------------------------------

const BASE = 'https://www.lrworkshop.com'

// --------------------------------------------------------------------------------------
// SEARCH LRWORKSHOP
// --------------------------------------------------------------------------------------

async function searchParts(query) {

  const url = ${BASE}/search/?q=

  console.log('🔍 LRWorkshop search:', url)

  const res = await fetch(url)
  const html = await res.text()

  const $ = cheerio.load(html)

  const results = []

  .part-row, .search-result, .result-item.each((i, el) => {

    const text = .text()

    // Extract part number (basic pattern)
    const match = text.match(/[A-Z]{2,}\d{3,}/)

    if (!match) return

    const partNumber = match[0]

    const description = text.trim().substring(0, 100)

    // Filter to Defender (basic filter)
    if (!text.toLowerCase().includes('defender')) return

    results.push({
      partNumber,
      description
    })
  })

  console.log('✔ LRWorkshop results:', results.length)

  return results
}

// --------------------------------------------------------------------------------------

module.exports = { searchParts }
