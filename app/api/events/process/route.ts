// Timestamp 7 March 2026 05:40
// Event Processor Engine

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(){

 const { data: events } =
 await supabase
  .from("reliability_event_stream")
  .select("*")
  .eq("processed",false)
  .limit(50)

 for(const e of events ?? []){

  // Update Digital Twin
  if(e.entity_type==="vehicle"){

   await supabase
    .from("vehicle_digital_twins")
    .update({

     last_simulated:new Date()

    })
    .eq("vin",e.entity_id)

  }

  // Mark event processed
  await supabase
   .from("reliability_event_stream")
   .update({ processed:true })
   .eq("id",e.id)

 }

 return NextResponse.json({

  processed:events?.length ?? 0

 })

}