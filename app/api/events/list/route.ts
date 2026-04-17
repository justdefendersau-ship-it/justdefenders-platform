// Timestamp 7 March 2026 05:40
// Event List API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } =
 await supabase
  .from("reliability_event_stream")
  .select("*")
  .order("created_at",{ascending:false})
  .limit(50)

 return NextResponse.json({

  events:data

 })

}