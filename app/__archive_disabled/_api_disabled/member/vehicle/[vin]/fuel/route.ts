// Timestamp: 11 March 2026 19:23
// API: Vehicle Fuel Logs

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:any,{params}:any){

 const { id } = params

 const { data } = await supabase
  .from("fuel_logs")
  .select("*")
  .eq("vehicle_id",id)
  .order("date",{ascending:false})

 return NextResponse.json(data)

}