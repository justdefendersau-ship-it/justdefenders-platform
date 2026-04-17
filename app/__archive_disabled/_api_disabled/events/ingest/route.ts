// Timestamp 7 March 2026 05:40
// Event Ingestion API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const { event_type, entity_type, entity_id, payload } = body

 await supabase
  .from("reliability_event_stream")
  .insert({

   event_type,
   entity_type,
   entity_id,
   payload

  })

 return NextResponse.json({

  status:"event_recorded"

 })

}