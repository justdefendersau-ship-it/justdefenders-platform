// Timestamp 6 March 2026 20:05
// File: /app/api/ai/fleet-ownership-insights/route.ts

/*
Fleet Ownership Intelligence
Aggregates lifecycle economics
for each Defender model.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

 const { data: vehicles } = await supabase
   .from("vehicles")
   .select("model")

 const insights = []

 for (const v of vehicles ?? []) {

   const { data: ownership } = await supabase
     .from("vehicle_ownership_profiles")
     .select("*")

   const avgAnnual =
     ownership?.reduce((s,o)=>s + (o.annual_cost ?? 0),0)
     / (ownership?.length ?? 1)

   const avgCostKm =
     ownership?.reduce((s,o)=>s + (o.cost_per_km ?? 0),0)
     / (ownership?.length ?? 1)

   const lifecycle =
     ownership?.reduce((s,o)=>s + (o.lifecycle_score ?? 0),0)
     / (ownership?.length ?? 1)

   insights.push({

     model: v.model,

     avg_annual_cost: avgAnnual,

     avg_cost_per_km: avgCostKm,

     lifecycle_score: lifecycle,

     vehicles_observed: ownership?.length ?? 0

   })

 }

 if (insights.length > 0) {

   await supabase
     .from("fleet_ownership_insights")
     .insert(insights)

 }

 return NextResponse.json({

   insights_generated: insights.length

 })

}