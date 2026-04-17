// Timestamp 7 March 2026 08:00
// Add Fuel Log

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const {
  vehicle_id,
  vin,
  fill_date,
  odometer_km,
  litres,
  price_per_litre,
  station,
  fuel_type
 } = body

 const total_cost = litres * price_per_litre

 await supabase
  .from("fuel_logs")
  .insert({

   vehicle_id,
   vin,
   fill_date,
   odometer_km,
   litres,
   price_per_litre,
   total_cost,
   fuel_type,
   station

  })

 return NextResponse.json({

  status:"fuel_recorded",
  total_cost

 })

}