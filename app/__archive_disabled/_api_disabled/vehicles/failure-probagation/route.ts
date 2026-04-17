/*
Timestamp: 8 March 2026 — 00:21
File: /app/api/vehicles/failure-propagation/route.ts

Purpose:
Generate failure propagation graph for a vehicle.
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
   return NextResponse.json({ nodes:[], links:[] })
  }

  const { data: parts } = await supabase
   .from("vin_part_compatibility")
   .select("component,part_number")

  const { data: propagation } = await supabase
   .from("component_failure_propagation")
   .select("*")

  const nodes:any[] = []
  const links:any[] = []

  if(parts){

   parts.forEach(p=>{

    nodes.push({
     id:p.component,
     label:p.component
    })

   })

  }

  if(propagation){

   propagation.forEach(p=>{

    links.push({
     source:p.source_component,
     target:p.target_component,
     probability:p.propagation_probability
    })

   })

  }

  return NextResponse.json({
   nodes,
   links
  })

 }catch(err){

  console.error("Failure propagation error:",err)

  return NextResponse.json({
   nodes:[],
   links:[]
  })

 }

}