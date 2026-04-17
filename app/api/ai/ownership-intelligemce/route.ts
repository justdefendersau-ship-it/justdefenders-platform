// Timestamp 6 March 2026 20:05
// File: /app/api/ai/ownership-intelligence/route.ts

/*
Defender Ownership Intelligence Engine

Calculates lifecycle cost metrics
for each vehicle.
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
   .select("*")

 const profiles = []

 for (const v of vehicles ?? []) {

   const { data: maintenance } = await supabase
     .from("maintenance_records")
     .select("cost")
     .eq("vin", v.vin)

   const { data: fuel } = await supabase
     .from("fuel_logs")
     .select("cost")
     .eq("vin", v.vin)

   const { data: parts } = await supabase
     .from("ownership_costs")
     .select("cost")
     .eq("vin", v.vin)

   const maintenanceCost =
     maintenance?.reduce((s, r)=>s + (r.cost ?? 0), 0) ?? 0

   const fuelCost =
     fuel?.reduce((s, r)=>s + (r.cost ?? 0), 0) ?? 0

   const partsCost =
     parts?.reduce((s, r)=>s + (r.cost ?? 0), 0) ?? 0


   const totalCost =
     maintenanceCost + fuelCost + partsCost

   const annualCost =
     totalCost / 5


   const distance = 100000

   const costPerKm =
     totalCost / distance


   const { data: reliability } = await supabase
     .from("defender_reliability_index")
     .select("reliability_score")
     .eq("entity_type","model")
     .eq("entity_id", v.model)
     .single()

   const reliabilityScore =
     reliability?.reliability_score ?? 85

   const reliabilityPenalty =
     (100 - reliabilityScore) * 10


   const lifecycleScore =
     100 - (costPerKm * 100) - (reliabilityPenalty / 100)


   profiles.push({

     vin: v.vin,

     maintenance_cost: maintenanceCost,

     fuel_cost: fuelCost,

     parts_cost: partsCost,

     total_cost: totalCost,

     annual_cost: annualCost,

     cost_per_km: costPerKm,

     reliability_penalty: reliabilityPenalty,

     lifecycle_score: lifecycleScore

   })

 }

 if (profiles.length > 0) {

   await supabase
     .from("vehicle_ownership_profiles")
     .insert(profiles)

 }

 return NextResponse.json({

   vehicles_processed: profiles.length

 })

}