/*
Maintenance API
Timestamp: 13 March 2026 21:00
Creates a new maintenance record
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const vin = body.vin
 const date = body.date
 const description = body.description
 const cost = body.cost
 const odometer = body.odometer

 if(!vin){

  return NextResponse.json(
   {error:"VIN required"},
   {status:400}
  )

 }

 const { error } = await supabase
  .from("maintenance_records")
  .insert({
   vin,
   date,
   description,
   cost,
   odometer,
   created_at:new Date()
  })

 if(error){

  return NextResponse.json(
   {error:error.message},
   {status:500}
  )

 }

 return NextResponse.json({
  success:true
 })

}