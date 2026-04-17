// Timestamp: 11 March 2026 20:22
// Failure Alerts Engine
// Compares vehicle mileage against known failure points

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

 const { data:vehicle } = await supabase
  .from("vehicles")
  .select("*")
  .eq("id",vehicleId)
  .single()

 if(!vehicle){
  return NextResponse.json([])
 }

 const { data:fuelLogs } = await supabase
  .from("fuel_logs")
  .select("odometer")
  .eq("vehicle_id",vehicleId)
  .order("odometer",{ascending:false})
  .limit(1)

 const currentKm =
  fuelLogs && fuelLogs.length
   ? fuelLogs[0].odometer
   : 0

 const { data:failures } = await supabase
  .from("defender_failures")
  .select("*")

 const alerts:any[] = []

 failures?.forEach(f=>{

  const diff = f.avg_failure_km - currentKm

  if(diff < 10000 && diff > 0){

   alerts.push({

    component:f.component,
    failureKm:f.avg_failure_km,
    vehicleKm:currentKm,
    warningDistance:diff

   })

  }

 })

 return NextResponse.json(alerts)

}