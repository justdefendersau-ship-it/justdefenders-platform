/*
========================================================
File: route.ts
Path: /app/api/analytics/route.ts
Timestamp: 15 March 2026 16:40
Project: JustDefenders Vehicle Intelligence Platform

Description:
Unified analytics API.

Operations supported:

fleet-health
vehicle-health
failure-predictions
supplier-reliability

This replaces dozens of analytics routes.

JustDefenders ©
========================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const operation = body.operation

/*
----------------------------------------
Fleet Health
----------------------------------------
*/

 if(operation === "fleet-health"){

  const { data } = await supabase
   .from("vehicles")
   .select("health_score")

  const healthy = data?.filter(v=>v.health_score >= 90).length || 0
  const warning = data?.filter(v=>v.health_score >= 70 && v.health_score < 90).length || 0
  const critical = data?.filter(v=>v.health_score < 70).length || 0

  return NextResponse.json({
   healthy,
   warning,
   critical
  })

 }

/*
----------------------------------------
Vehicle Health
----------------------------------------
*/

 if(operation === "vehicle-health"){

  const vin = body.vin

  const { data } = await supabase
   .from("vehicles")
   .select("health_score")
   .eq("vin",vin)
   .single()

  return NextResponse.json(data)

 }

/*
----------------------------------------
Failure Predictions
----------------------------------------
*/

 if(operation === "failure-predictions"){

  const { data } = await supabase
   .from("failure_predictions")
   .select("*")
   .order("probability",{ ascending:false })
   .limit(10)

  return NextResponse.json(data)

 }

 return NextResponse.json({
  error:"Unknown analytics operation"
 },{ status:400 })

}