// Timestamp: 11 March 2026 19:22
// API: Vehicle Maintenance Records

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:any,{params}:any){

 const { id } = params

 const { data } = await supabase
  .from("maintenance_records")
  .select("*")
  .eq("vehicle_id",id)
  .order("date",{ascending:false})

 return NextResponse.json(data)

}