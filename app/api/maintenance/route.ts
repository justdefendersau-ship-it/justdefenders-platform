// Timestamp: 11 March 2026 17:34
// Maintenance API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("maintenance_records")
  .select("*")
  .order("date",{ascending:false})

 return NextResponse.json(data)

}

export async function POST(req:Request){

 const body = await req.json()

 const { vehicle_id,description,cost } = body

 await supabase.from("maintenance_records").insert({

  vehicle_id,
  description,
  cost,
  date:new Date()

 })

 return NextResponse.json({success:true})

}