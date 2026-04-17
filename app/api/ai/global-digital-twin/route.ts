// Timestamp 7 March 2026 03:10
// Global Digital Twin Network

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data: twins } =
 await supabase
  .from("vehicle_digital_twins")
  .select("*")

 const globalHealth =
 twins?.reduce(
  (a:any,b:any)=>a+(b.health_score ?? 0),0
 )/(twins?.length || 1)

 return NextResponse.json({

  vehicles:twins?.length ?? 0,

  global_health_index:globalHealth

 })

}