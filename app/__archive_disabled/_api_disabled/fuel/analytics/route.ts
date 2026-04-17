// Timestamp 7 March 2026 08:00
// Fuel Analytics Engine

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const vehicle_id = searchParams.get("vehicle_id")

 const { data: logs } =
 await supabase
  .from("fuel_logs")
  .select("*")
  .eq("vehicle_id",vehicle_id)
  .order("odometer_km",{ascending:true})

 if(!logs || logs.length < 2){

  return NextResponse.json({
   message:"Not enough data"
  })

 }

 let totalDistance = 0
 let totalFuel = 0

 for(let i=1;i<logs.length;i++){

  const distance =
   logs[i].odometer_km - logs[i-1].odometer_km

  totalDistance += distance
  totalFuel += logs[i].litres

 }

 const fuelEconomy =
 (totalFuel / totalDistance) * 100

 return NextResponse.json({

  fuel_economy_l_per_100km:fuelEconomy,
  distance_km:totalDistance,
  fuel_used:totalFuel

 })

}