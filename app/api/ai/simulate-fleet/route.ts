// Timestamp 7 March 2026 03:10
// Fleet Digital Twin Simulator

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(){

 const { data: twins } =
 await supabase
  .from("vehicle_digital_twins")
  .select("*")

 let risk=0

 for(const t of twins ?? []){

  risk+=t.predicted_failure_risk ?? 0

 }

 const fleetRisk =
 risk / (twins?.length || 1)

 return NextResponse.json({

  vehicles:twins?.length ?? 0,

  fleet_failure_risk:fleetRisk

 })

}