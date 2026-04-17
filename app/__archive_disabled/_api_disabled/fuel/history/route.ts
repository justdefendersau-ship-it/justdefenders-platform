// Timestamp 7 March 2026 08:00
// Fuel History API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const vehicle_id = searchParams.get("vehicle_id")

 const { data } =
 await supabase
  .from("fuel_logs")
  .select("*")
  .eq("vehicle_id",vehicle_id)
  .order("fill_date",{ascending:false})

 return NextResponse.json({

  fuel_logs:data

 })

}