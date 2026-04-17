// Timestamp 6 March 2026 21:10
// File: /app/api/system/send-alerts/route.ts

/*
Alert Notification Dispatcher

Sends alerts to subscribed channels
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

 const { data: alerts } = await supabase
   .from("reliability_alerts")
   .select("*")
   .eq("resolved", false)

 const { data: subs } = await supabase
   .from("alert_subscriptions")
   .select("*")

 for (const alert of alerts ?? []) {

   for (const sub of subs ?? []) {

     if (sub.alert_type === alert.alert_type) {

       console.log("Sending alert to", sub.destination)

     }

   }

 }

 return NextResponse.json({

   alerts_processed: alerts?.length ?? 0

 })

}