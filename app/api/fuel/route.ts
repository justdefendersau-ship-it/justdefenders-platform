// Timestamp: 11 March 2026 18:10
// Fuel Logs API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("fuel_logs")
  .select("*")
  .order("date",{ascending:false})

 return NextResponse.json(data)

}

export async function POST(req:Request){

 const body = await req.json()

 const { vehicle_id,litres,total_cost,odometer } = body

 await supabase.from("fuel_logs").insert({

  vehicle_id,
  litres,
  total_cost,
  odometer,
  date:new Date()

 })

 return NextResponse.json({success:true})

}