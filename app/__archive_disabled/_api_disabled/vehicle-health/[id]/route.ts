// Timestamp: 11 March 2026 19:52
// Vehicle Health API
// Aggregates vehicle analytics

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
 req:Request,
 { params }: { params:{ id:string } }
){

 const vehicleId = params.id

 const { data:vehicle } = await supabase
  .from("vehicles")
  .select("*")
  .eq("id",vehicleId)
  .single()

 const { data:maintenance } = await supabase
  .from("maintenance_records")
  .select("*")
  .eq("vehicle_id",vehicleId)

 const { data:fuel } = await supabase
  .from("fuel_logs")
  .select("*")
  .eq("vehicle_id",vehicleId)

 const maintenanceCost =
  maintenance?.reduce((t,r)=>t + (r.cost || 0),0) || 0

 return NextResponse.json({

  vehicle,
  maintenanceCost,
  maintenanceCount:maintenance?.length || 0,
  fuelEntries:fuel?.length || 0

 })

}