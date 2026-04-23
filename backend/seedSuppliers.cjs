require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const suppliers = [

  {
    name: "All Four x 4 Spares",
    website: "https://www.allfourx4.com.au",
    address: "11 McDougall St, Kotara NSW 2289",
    country: "AU",
    type: "both"
  },

  {
    name: "MR Automotive",
    website: "https://mrautomotive.com.au",
    address: "182 Anzac Ave, Redcliffe QLD 4020",
    country: "AU",
    type: "both"
  },

  {
    name: "Karcraft",
    website: "https://karcraft.com.au",
    address: "28 Bearing Rd, Seven Hills NSW 2147",
    country: "AU",
    type: "both"
  },

  {
    name: "TR Spares",
    website: "https://trspares.com.au",
    address: "45 Fairford Rd, Padstow NSW 2211",
    country: "AU",
    type: "both"
  },

  {
    name: "GMS Spares",
    website: "https://gmsspares.com.au",
    address: "26 Mavis St, Revesby NSW 2212",
    country: "AU",
    type: "both"
  },

  {
    name: "LR Direct",
    website: "https://www.lrdirect.com",
    address: "United Kingdom",
    country: "UK",
    type: "online"
  }

]

async function run() {

  for (const s of suppliers) {

    const { error } = await supabase
      .from('suppliers')
      .insert(s)

    if (error) {
      console.log('Error:', s.name, error.message)
    } else {
      console.log('Inserted:', s.name)
    }
  }

  console.log('DONE')
}

run()
