// Timestamp 6 March 2026 21:10
// File: /app/api/system/detect-alerts/route.ts

/*
Reliability Alert Detection Engine

Detects:
high failure probability
fleet risk spikes
supplier reliability drops
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

 const alerts = []

 const { data: failures } = await supabase
   .from("vin_failure_predictions")
   .select("*")

 for (const f of failures ?? []) {

   if (f.failure_probability > 0.7) {

     alerts.push({

       alert_type: "vehicle_failure_risk",

       entity_type: "vehicle",

       entity_id: f.vin,

       severity: 3,

       message: "High failure probability detected"

     })

   }

 }

 const { data: suppliers } = await supabase
   .from("supplier_failure_stats")
   .select("*")

 for (const s of suppliers ?? []) {

   if (s.failure_rate > 0.15) {

     alerts.push({

       alert_type: "supplier_reliability_drop",

       entity_type: "supplier",

       entity_id: s.supplier_id,

       severity: 2,

       message: "Supplier failure rate above threshold"

     })

   }

 }

 if (alerts.length > 0) {

   await supabase
     .from("reliability_alerts")
     .insert(alerts)

 }

 return NextResponse.json({

   alerts_generated: alerts.length

 })

}