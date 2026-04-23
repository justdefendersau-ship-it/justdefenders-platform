require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const suppliers = [
  { name: "MR Automotive", address: "182 Anzac Ave, Redcliffe QLD 4020" },
  { name: "Karcraft", address: "Unit 2, 28 Bearing Rd, Seven Hills NSW 2147" },
  { name: "TR Spares", address: "45 Fairford Rd, Padstow NSW 2211" },
  { name: "GMS Spares", address: "26 Mavis St, Revesby NSW 2212" },
  { name: "Rovacraft", address: "Australia (Multiple locations)" }
]

async function run() {

  for (const s of suppliers) {

    const { error } = await supabase
      .from('suppliers')
      .update({ address: s.address })
      .eq('name', s.name)

    if (error) {
      console.log('Error:', s.name, error.message)
    } else {
      console.log('Updated:', s.name)
    }
  }

  console.log('DONE')
}

run()
