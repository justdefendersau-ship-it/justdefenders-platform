/*
Timestamp: 8 March 2026 — 03:28
File: /app/api/agent/procurement/route.ts

Purpose:
Autonomous Parts Procurement Agent

Detects predicted part failures and
generates procurement recommendations.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

  const { data: maintenance } = await supabase
   .from("maintenance_predictions")
   .select("*")

  if(!maintenance){
   return NextResponse.json({ actions:0 })
  }

  let actions = 0

  for(const m of maintenance){

   const { data: inventory } = await supabase
    .from("my_shed_parts")
    .select("*")
    .eq("part_number",m.part_number)
    .single()

   if(!inventory){

    const message =
     `Procurement agent recommends ordering ${m.part_number} for VIN ${m.vin}`

    await supabase
     .from("procurement_agent_actions")
     .insert({

      vin:m.vin,
      part_number:m.part_number,
      component:m.component,
      quantity:1,
      source:"maintenance_prediction",
      message

     })

    await supabase
     .from("command_center_notifications")
     .insert({

      type:"procurement",
      severity:"warning",
      message,
      vin:m.vin,
      component:m.component

     })

    actions++

   }

  }

  return NextResponse.json({
   actions
  })

 }catch(err){

  console.error("Procurement agent error:",err)

  return NextResponse.json({
   actions:0
  })

 }

}