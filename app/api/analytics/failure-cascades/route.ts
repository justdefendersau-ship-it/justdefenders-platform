/*
Timestamp: 8 March 2026 — 22:08
File: /app/api/analytics/failure-cascades/route.ts

Purpose:
Compute component failure cascades across the fleet.

This API ALWAYS returns an array to ensure
frontend stability.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface Cascade {

 vin: string
 root_component: string
 cascade_chain: string[]
 total_risk: number

}

export async function GET() {

 try {

  const cascades: Cascade[] = []

  const { data: predictions, error } = await supabase
   .from("vin_failure_predictions")
   .select(`
    vin,
    predicted_component,
    failure_probability
   `)
   .gt("failure_probability",0.55)

  if (error || !predictions) {

   console.error("Prediction query failed:",error)
   return NextResponse.json([])

  }

  for (const p of predictions) {

   const { data: relations } = await supabase
    .from("component_failure_stats")
    .select("downstream_component")
    .eq("component",p.predicted_component)
    .limit(3)

   if (!relations || relations.length === 0) continue

   const chain = [
    p.predicted_component,
    ...relations.map(r=>r.downstream_component)
   ]

   cascades.push({

    vin: p.vin,
    root_component: p.predicted_component,
    cascade_chain: chain,
    total_risk: p.failure_probability

   })

  }

  cascades.sort((a,b)=>b.total_risk-a.total_risk)

  return NextResponse.json(cascades.slice(0,15))

 } catch (err) {

  console.error("Cascade prediction engine error:",err)

  return NextResponse.json([])

 }

}