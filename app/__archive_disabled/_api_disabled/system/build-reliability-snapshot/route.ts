// Timestamp 7 March 2026 04:40
// Reliability Snapshot Builder

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

 const fleetHealth =
 twins?.reduce((a:any,b:any)=>a+(b.health_score||0),0) /
 (twins?.length || 1)

 const { data: failures } =
 await supabase
  .schema("reliability_dw")
  .from("fact_failures")
  .select("*")

 const avgFailure =
 failures?.reduce((a:any,b:any)=>a+(b.failure_rate||0),0) /
 (failures?.length || 1)

 await supabase
  .schema("reliability_dw")
  .from("reliability_snapshots")
  .insert({

   snapshot_date:new Date(),
   fleet_health:fleetHealth,
   global_reliability_index:100-avgFailure*100,
   average_component_failure:avgFailure,
   vehicles_observed:twins?.length

  })

 return NextResponse.json({

  snapshot_created:true

 })

}