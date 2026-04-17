// Timestamp: 11 March 2026 19:21
// API: Vehicle Reliability Score

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:any,{params}:any){

 const { id } = params

 const { data } = await supabase
  .from("vehicle_reliability_scores")
  .select("*")
  .eq("vehicle_id",id)
  .single()

 return NextResponse.json(data)

}