// Timestamp: 11 March 2026 19:10
// Trips API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("trips")
  .select("*")
  .order("start_time",{ascending:false})

 return NextResponse.json(data)

}

export async function POST(req:Request){

 const body = await req.json()

 const {

  vehicle_id,
  name,
  start_location,
  end_location,
  start_odometer,
  end_odometer

 } = body

 await supabase.from("trips").insert({

  vehicle_id,
  name,
  start_location,
  end_location,
  start_odometer,
  end_odometer,
  start_time:new Date()

 })

 return NextResponse.json({success:true})

}