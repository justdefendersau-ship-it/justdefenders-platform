// route.ts
// Timestamp: 10 March 2026 18:55
// Commentary:
// Calculates ownership costs.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const fuel = await supabase
  .from("fuel_logs")
  .select("*")

 const maintenance = await supabase
  .from("maintenance_records")
  .select("*")

 let fuelCost = 0
 let fuelDistance = 0

 const f = fuel.data || []

 for(let i=1;i<f.length;i++){

  fuelCost += f[i].litres * f[i].price

  fuelDistance +=
   f[i].odometer - f[i-1].odometer

 }

 const fuelPerKm =
  fuelDistance > 0
   ? fuelCost / fuelDistance
   : 0

 let maintenanceCost = 0

 maintenance.data?.forEach(m=>{
  maintenanceCost += m.cost || 0
 })

 const maintenancePerKm =
  fuelDistance > 0
   ? maintenanceCost / fuelDistance
   : 0

 return NextResponse.json({

  fuel_per_km: fuelPerKm.toFixed(2),
  maintenance_per_km: maintenancePerKm.toFixed(2),
  total_per_km:
   (fuelPerKm + maintenancePerKm).toFixed(2)

 })

}