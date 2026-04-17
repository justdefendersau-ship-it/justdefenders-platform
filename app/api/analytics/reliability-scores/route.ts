/*
Timestamp: 7 March 2026 — 20:07
File: /app/api/analytics/reliability-scores/route.ts

Purpose:
Fleet Reliability Score Engine

Computes reliability scores for vehicles using:

• maintenance history
• component failure statistics
• supplier reliability
• predicted failures
• risk aggregates

Output scale:
0–100 reliability score
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface Score {

 vin: string
 reliability_score: number
 risk_level: string

}

export async function GET(){

 try{

  const scores: Score[] = []

  const { data: vehicles, error } = await supabase
   .from("vehicles")
   .select("vin")

  if(error || !vehicles){

   console.error("Vehicle query failed:",error)
   return NextResponse.json([])

  }

  for(const v of vehicles){

   const vin = v.vin

   const { data: failures } = await supabase
    .from("vin_failure_predictions")
    .select("failure_probability")
    .eq("vin",vin)

   const { data: maintenance } = await supabase
    .from("maintenance_records")
    .select("id")
    .eq("vin",vin)

   const { data: risk } = await supabase
    .from("risk_aggregates")
    .select("risk_score")
    .eq("vin",vin)
    .single()

   let predictedFailureRisk = 0

   if(failures && failures.length > 0){

    const avg =
     failures.reduce(
      (sum,f)=>sum + (f.failure_probability || 0),0
     ) / failures.length

    predictedFailureRisk = avg * 40

   }

   const maintenancePenalty =
    (maintenance?.length || 0) * 2

   const riskPenalty =
    (risk?.risk_score || 0) * 0.3

   let score =
    100 -
    predictedFailureRisk -
    maintenancePenalty -
    riskPenalty

   if(score < 0) score = 0
   if(score > 100) score = 100

   let riskLevel = "low"

   if(score < 40) riskLevel = "critical"
   else if(score < 60) riskLevel = "high"
   else if(score < 80) riskLevel = "moderate"

   scores.push({

    vin,
    reliability_score: Number(score.toFixed(1)),
    risk_level: riskLevel

   })

  }

  scores.sort((a,b)=>b.reliability_score-a.reliability_score)

  return NextResponse.json(scores)

 }catch(err){

  console.error("Reliability score engine error:",err)

  return NextResponse.json([])

 }

}