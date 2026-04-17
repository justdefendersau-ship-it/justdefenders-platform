// Timestamp 7 March 2026 03:40
// Reliability Warehouse Analytics API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data: failures } =
 await supabase
  .schema("reliability_dw")
  .from("fact_failures")
  .select("*")

 const avgFailure =
 failures?.reduce(
  (a:any,b:any)=>a+(b.failure_rate ?? 0),0
 )/(failures?.length || 1)

 return NextResponse.json({

  components:failures?.length ?? 0,

  average_failure_rate:avgFailure

 })

}