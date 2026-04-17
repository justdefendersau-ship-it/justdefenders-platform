/*
Timestamp: 8 March 2026 — 02:06
File: /app/api/ai/copilot/route.ts

Purpose:
Fleet Reliability AI Copilot
processes natural language fleet intelligence queries.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 try{

  const { question } = await req.json()

  const q = question.toLowerCase()

  if(q.includes("vehicles likely to fail")){

   const { data } = await supabase
    .from("vin_failure_predictions")
    .select("vin,predicted_component,failure_probability")
    .gt("failure_probability",0.6)

   return NextResponse.json({
    type:"failure_predictions",
    data:data || []
   })

  }

  if(q.includes("maintenance")){

   const { data } = await supabase
    .from("maintenance_predictions")
    .select("*")
    .limit(20)

   return NextResponse.json({
    type:"maintenance",
    data:data || []
   })

  }

  if(q.includes("supplier")){

   const { data } = await supabase
    .from("supplier_failure_stats")
    .select("*")
    .order("failure_rate",{ ascending:false })
    .limit(10)

   return NextResponse.json({
    type:"supplier_reliability",
    data:data || []
   })

  }

  if(q.includes("risk")){

   const { data } = await supabase
    .from("risk_aggregates")
    .select("*")
    .order("risk_score",{ ascending:false })
    .limit(10)

   return NextResponse.json({
    type:"fleet_risk",
    data:data || []
   })

  }

  return NextResponse.json({
   type:"unknown",
   message:"I could not understand the question."
  })

 }catch(err){

  console.error("AI Copilot error:",err)

  return NextResponse.json({
   error:"AI Copilot failed"
  })

 }

}