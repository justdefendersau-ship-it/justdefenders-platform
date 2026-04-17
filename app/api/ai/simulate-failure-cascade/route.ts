// Timestamp 7 March 2026 03:10
// Failure Cascade Simulation

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body=await req.json()

 const { vin,component } = body

 const { data: twins } =
 await supabase
  .from("component_digital_twins")
  .select("*")
  .eq("vin",vin)

 const cascades:any[]=[]

 for(const t of twins ?? []){

  if(t.part_number!==component){

   cascades.push({

    source:component,
    affected:t.part_number,
    risk_increase:0.05

   })

  }

 }

 return NextResponse.json({

  cascades

 })

}