// Timestamp: 11 March 2026 20:41
// Fuel Analytics API
// Calculates fuel economy metrics for a vehicle

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
 req:Request,
 { params }: { params:{ vehicleId:string } }
){

 const vehicleId = params.vehicleId

 const { data:fuel } = await supabase
  .from("fuel_logs")
  .select("*")
  .eq("vehicle_id",vehicleId)
  .order("odometer",{ascending:true})

 if(!fuel || fuel.length < 2){

  return NextResponse.json({

   fuelEconomy:0,
   costPerKm:0,
   avgFuelPrice:0

  })

 }

 let totalLitres = 0
 let totalCost = 0

 fuel.forEach(f=>{

  totalLitres += Number(f.litres || 0)
  totalCost += Number(f.total_cost || 0)

 })

 const distance =
  fuel[fuel.length-1].odometer -
  fuel[0].odometer

 const fuelEconomy =
  distance > 0
   ? (totalLitres / distance) * 100
   : 0

 const costPerKm =
  distance > 0
   ? totalCost / distance
   : 0

 const avgFuelPrice =
  totalLitres > 0
   ? totalCost / totalLitres
   : 0

 return NextResponse.json({

  fuelEconomy:fuelEconomy.toFixed(2),
  costPerKm:costPerKm.toFixed(2),
  avgFuelPrice:avgFuelPrice.toFixed(2)

 })

}