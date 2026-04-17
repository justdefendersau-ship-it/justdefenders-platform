// Timestamp: 12 March 2026 00:06
// Fleet Intelligence API (safe version)
// Prevents crashes when tables are empty

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

  const vehiclesResult = await supabase
   .from("vehicles")
   .select("*")

  const maintenanceResult = await supabase
   .from("maintenance_records")
   .select("*")

  const fuelResult = await supabase
   .from("fuel_logs")
   .select("*")

  const vehicles = vehiclesResult.data || []
  const maintenance = maintenanceResult.data || []
  const fuel = fuelResult.data || []

  const fleetSize = vehicles.length

  let totalMaintenance = 0
  let totalFuel = 0

  maintenance.forEach(m=>{
   totalMaintenance += Number(m.cost || 0)
  })

  fuel.forEach(f=>{
   totalFuel += Number(f.total_cost || 0)
  })

  const avgMaintenance =
   fleetSize > 0
    ? totalMaintenance / fleetSize
    : 0

  return NextResponse.json({

   fleetSize,
   totalMaintenance:totalMaintenance.toFixed(2),
   totalFuel:totalFuel.toFixed(2),
   avgMaintenance:avgMaintenance.toFixed(2)

  })

 }catch(error){

  console.error("Fleet intelligence error:",error)

  return NextResponse.json({

   fleetSize:0,
   totalMaintenance:0,
   totalFuel:0,
   avgMaintenance:0

  })

 }

}