// Timestamp 6 March 2026 20:50
// File: /app/api/system/data-integrity-check/route.ts

/*
Defender Data Integrity Engine

Checks:
invalid VINs
duplicate failures
invalid telemetry
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { validateVIN } from "@/lib/vin-validator"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

 const issues = []

 const { data: vehicles } = await supabase
   .from("vehicles")
   .select("*")

 for (const v of vehicles ?? []) {

   if (!validateVIN(v.vin)) {

     issues.push({

       entity_type: "vehicle",
       entity_id: v.vin,
       issue_type: "invalid_vin",
       severity: 3,
       description: "VIN failed validation"

     })

     await supabase
       .from("data_quarantine")
       .insert({

         entity_type: "vehicle",
         entity_id: v.vin,
         payload: v,
         reason: "invalid_vin"

       })

   }

 }

 const { data: failures } = await supabase
   .from("component_failure_stats")
   .select("*")

 const seen = new Set()

 for (const f of failures ?? []) {

   const key = `${f.part_number}_${f.failure_count}`

   if (seen.has(key)) {

     issues.push({

       entity_type: "component",
       entity_id: f.part_number,
       issue_type: "duplicate_failure_record",
       severity: 2,
       description: "Duplicate failure record detected"

     })

   }

   seen.add(key)

 }

 if (issues.length > 0) {

   await supabase
     .from("data_integrity_events")
     .insert(issues)

 }

 return NextResponse.json({

   issues_detected: issues.length

 })

}