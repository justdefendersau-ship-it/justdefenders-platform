// Timestamp 7 March 2026 03:40
// File: /app/api/system/build-warehouse/route.ts

/*
Reliability Intelligence Data Warehouse Builder

Aggregates operational tables
into analytics warehouse tables.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(){

 try{

  // COMPONENT FAILURE FACTS
  const { data: components } =
   await supabase
    .from("component_failure_stats")
    .select("*")

  const failureFacts:any[]=[]

  for(const c of components ?? []){

   failureFacts.push({

    part_number:c.part_number,
    failure_count:c.failure_count ?? 0,
    vehicles_affected:c.vehicles_affected ?? 0,
    failure_rate:c.failure_rate ?? 0

   })

  }

  if(failureFacts.length){

   await supabase
    .schema("reliability_dw")
    .from("fact_failures")
    .insert(failureFacts)

  }

  // VEHICLE FACTS
  const { data: vehicles } =
   await supabase
    .from("defender_reliability_index")
    .select("*")

  const vehicleFacts:any[]=[]

  for(const v of vehicles ?? []){

   vehicleFacts.push({

    vin:v.entity_id,
    model:v.model,
    production_year:v.production_year,
    failure_events:v.failure_events,
    reliability_score:v.reliability_score

   })

  }

  if(vehicleFacts.length){

   await supabase
    .schema("reliability_dw")
    .from("fact_vehicles")
    .insert(vehicleFacts)

  }

  return NextResponse.json({

   warehouse_status:"updated",

   component_records:failureFacts.length,
   vehicle_records:vehicleFacts.length

  })

 }catch(e:any){

  return NextResponse.json({

   error:e.message

  })

 }

}