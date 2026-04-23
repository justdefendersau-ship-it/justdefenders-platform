const fs = require('fs')

// Import your existing scraper
const { scrapeJLR } = require('../lib/scrapers/jlrClassic.ts')

// Load existing cache (safe)
let existing = {}

try {
  const raw = fs.readFileSync('../data/jlrCache.json', 'utf-8')
  const clean = raw.replace(/^\uFEFF/, '')
  existing = JSON.parse(clean)
} catch (err) {
  console.log('No existing cache found, starting fresh...')
}

// --------------------------------------------------------------------------------------
// TARGET PART SEARCHES (expand over time)
// --------------------------------------------------------------------------------------

const queries = [
  'starter motor defender',
  'alternator defender',
  'oil filter defender',
  'fuel filter defender',
  'water pump defender',
  'clutch kit defender',
  'brake pads defender',
  'radiator defender',
  'injector defender',
  'turbo defender'
]

// --------------------------------------------------------------------------------------
// MAIN IMPORT
// --------------------------------------------------------------------------------------

async function run() {

  console.log('Starting JLR bulk import...')

  for (const q of queries) {

    console.log('Searching:', q)

    try {
      const results = await scrapeJLR(q)

      for (const r of results) {

        if (!r.partNumber) continue

        existing[r.partNumber] = {
          description: r.description || 'Unknown',
          imageUrl: r.imageUrl || null
        }
      }

      console.log('✔ Imported:', results.length)

    } catch (err) {
      console.log('Failed:', q, err.message)
    }
  }

  // Save merged cache
  fs.writeFileSync(
    '../data/jlrCache.json',
    JSON.stringify(existing, null, 2)
  )

  console.log('JLR CACHE UPDATED')
}

run()
