/*
Timestamp: 7 March 2026 — 23:23
File: /app/api/parts/vin-compatibility/route.ts

Purpose:
Return VIN-aware compatible parts.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 try{

  const { searchParams } = new URL(req.url)

  const vin = searchParams.get("vin")

  if(!vin){
   return NextResponse.json([])
  }

  const { data: vehicle } = await supabase
   .from("vehicles")
   .select("vin,model,engine,year")
   .eq("vin",vin)
   .single()

  if(!vehicle){
   return NextResponse.json([])
  }

  const { data: parts } = await supabase
   .from("vin_part_compatibility")
   .select("*")
   .eq("engine",vehicle.engine)

  return NextResponse.json(parts || [])

 }catch(err){

  console.error("VIN compatibility error:",err)

  return NextResponse.json([])

 }

}