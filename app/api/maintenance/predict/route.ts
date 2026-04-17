/*
Timestamp: 8 March 2026 — 00:48
File: /app/api/maintenance/predict/route.ts

Purpose:
Generate predictive maintenance recommendations.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

  const { data: predictions } = await supabase
   .from("vin_failure_predictions")
   .select("*")

  if(!predictions){
   return NextResponse.json({ generated:0 })
  }

  let generated = 0

  for(const p of predictions){

   const start = new Date()

   const end = new Date()

   end.setDate(end.getDate() + 14)

   await supabase
    .from("maintenance_predictions")
    .insert({

     vin:p.vin,
     component:p.predicted_component,
     part_number:p.part_number || null,

     probability:p.failure_probability,

     window_start:start,
     window_end:end

    })

   generated++

  }

  return NextResponse.json({ generated })

 }catch(err){

  console.error("Maintenance prediction error:",err)

  return NextResponse.json({ generated:0 })

 }

}