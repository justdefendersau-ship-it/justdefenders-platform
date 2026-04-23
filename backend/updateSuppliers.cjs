require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const suppliers = [
  { name: "Rovacraft", address: "Perth, Sydney, Melbourne Australia" },
  { name: "British Off Road", address: "643 Chevallum Rd, QLD Australia" },
  { name: "Landybitz", address: "Molendinar QLD Australia" },
  { name: "TR Spares", address: "Padstow NSW Australia" },
  { name: "GMS Spares", address: "Revesby NSW Australia" }
]

async function run() {

  for (const s of suppliers) {

    const { error } = await supabase
      .from('suppliers')
      .update({ address: s.address })
      .eq('name', s.name)

    if (error) {
      console.log('Error updating:', s.name, error.message)
    } else {
      console.log('Updated:', s.name)
    }
  }

  console.log('DONE')
}

run()
