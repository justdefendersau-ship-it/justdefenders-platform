// Timestamp: 11 March 2026 11:33
// Fleet Analytics API
// Returns fleet size, fuel spend, maintenance cost, fleet distance, reliability

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

 // Fleet size
 const { data: vehicles } = await supabase
  .from("vehicles")
  .select("id")

 const fleetSize = vehicles?.length || 0


 // Fuel spend
 const { data: fuelLogs } = await supabase
  .from("fuel_logs")
  .select("total_cost")

 const fuelSpend =
  fuelLogs?.reduce((sum,row)=>sum + Number(row.total_cost || 0),0) || 0


 // Maintenance cost
 const { data: maintenance } = await supabase
  .from("maintenance_records")
  .select("cost")

 const maintenanceCost =
  maintenance?.reduce((sum,row)=>sum + Number(row.cost || 0),0) || 0


 // Fleet distance
 const { data: trips } = await supabase
  .from("trips")
  .select("start_odometer,end_odometer")

 const fleetDistance =
  trips?.reduce((sum,row)=>
   sum + (Number(row.end_odometer||0) - Number(row.start_odometer||0)),0
  ) || 0


 // Reliability
 const { data: reliability } = await supabase
  .from("vehicle_reliability_scores")
  .select("reliability_score")

 const avgReliability =
  reliability?.reduce((sum,row)=>sum + Number(row.reliability_score || 0),0) /
  (reliability?.length || 1)


 return NextResponse.json({

  fleet_size: fleetSize,
  fuel_spend: fuelSpend,
  maintenance_cost: maintenanceCost,
  fleet_distance: fleetDistance,
  fleet_reliability: Math.round(avgReliability)

 })

}