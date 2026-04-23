require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

async function harvest() {

  console.log('HARVEST RUN:', new Date().toISOString())

  const res = await fetch('http://localhost:4000/api/parts?q=starter&vin=DEF-110-001')
  const data = await res.json()

  for (const r of data.results) {

    const record = {
      supplier: r.supplier,
      part_number: r.partNumber,
      price: r.price,
      vin: 'DEF-110-001'
    }

    const { error } = await supabase
      .from('price_history')
      .insert([record])

    if (error) {
      console.log('INSERT ERROR:', error.message)
    } else {
      console.log('Saved:', record.price)
    }
  }
}

setInterval(harvest, 60000)

harvest()
