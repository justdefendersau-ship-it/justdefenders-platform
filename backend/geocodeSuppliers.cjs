require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

// --------------------------------------------------------------------------------------
// CONFIG
// --------------------------------------------------------------------------------------

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

if (!API_KEY) {
  console.log('ERROR: Missing GOOGLE_MAPS_API_KEY in .env')
  process.exit(1)
}

// --------------------------------------------------------------------------------------
// GEOCODE FUNCTION
// --------------------------------------------------------------------------------------

async function geocode(address) {

  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    + encodeURIComponent(address)
    + '&key=' + API_KEY

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.status !== 'OK') {
      console.log('Geocode failed:', address, data.status)
      return null
    }

    const loc = data.results[0].geometry.location

    return {
      lat: loc.lat,
      lng: loc.lng
    }

  } catch (err) {
    console.log('Fetch error:', err.message)
    return null
  }
}

// --------------------------------------------------------------------------------------
// MAIN
// --------------------------------------------------------------------------------------

async function run() {

  console.log('Starting geocoding...')

  const { data: suppliers, error } = await supabase
    .from('suppliers')
    .select('*')

  if (error) {
    console.log('Supabase error:', error.message)
    return
  }

  for (const s of suppliers) {

    if (!s.address) {
      console.log('Skipping (no address):', s.name)
      continue
    }

    if (s.lat && s.lng) {
      console.log('Already done:', s.name)
      continue
    }

    console.log('Geocoding:', s.name)

    const coords = await geocode(s.address)

    if (!coords) continue

    const { error: updateError } = await supabase
      .from('suppliers')
      .update({
        lat: coords.lat,
        lng: coords.lng
      })
      .eq('name', s.name)

    if (updateError) {
      console.log('Update failed:', s.name)
console.log(updateError)
    } else {
      console.log('Updated:', s.name, coords)
    }

    // prevent rate limits
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('DONE')
}

run()


