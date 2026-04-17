/*
Timestamp: 7 March 2026 — 23:52
File: /app/api/vehicles/vin-digital-twin/route.ts

Purpose:
Generate VIN digital twin component graph.
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
   .eq("vin_prefix",vin.substring(0,5))

  const nodes:any[] = []
  const links:any[] = []

  if(parts){

   parts.forEach((p,i)=>{

    nodes.push({
     id:p.part_number,
     label:p.component,
     type:"component"
    })

    if(i > 0){

     links.push({
      source:parts[i-1].part_number,
      target:p.part_number
     })

    }

   })

  }

  return NextResponse.json({
   nodes,
   links
  })

 }catch(err){

  console.error("VIN digital twin error:",err)

  return NextResponse.json({
   nodes:[],
   links:[]
  })

 }

}