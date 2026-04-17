/*
Timestamp: 8 March 2026 — 02:58
File: /app/api/agent/reliability/route.ts

Purpose:
Autonomous Reliability Agent

Scans fleet reliability signals and
generates automated actions.
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
   return NextResponse.json({ actions:0 })
  }

  let actions = 0

  for(const p of predictions){

   if(p.failure_probability > 0.75){

    const message =
     `Autonomous agent flagged ${p.predicted_component} risk on VIN ${p.vin}`

    await supabase
     .from("reliability_agent_actions")
     .insert({

      vin:p.vin,
      component:p.predicted_component,
      probability:p.failure_probability,
      action_type:"maintenance_alert",
      message

     })

    await supabase
     .from("command_center_notifications")
     .insert({

      type:"autonomous_alert",
      severity:"critical",
      message,
      vin:p.vin,
      component:p.predicted_component

     })

    actions++

   }

  }

  return NextResponse.json({
   actions
  })

 }catch(err){

  console.error("Autonomous agent error:",err)

  return NextResponse.json({
   actions:0
  })

 }

}