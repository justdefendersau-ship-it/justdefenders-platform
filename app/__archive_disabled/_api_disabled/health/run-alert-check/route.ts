/* Timestamp: 12 March 2026 22:02 */
/* Health Alert Rules Engine */

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

 const { data:vehicles } = await supabase
  .from("vehicles")
  .select("vin")

 if(!vehicles) {
  return NextResponse.json({status:"no vehicles"})
 }

 for(const v of vehicles){

  const { data:history } = await supabase
   .from("vehicle_health_history")
   .select("health_score, recorded_at")
   .eq("vin", v.vin)
   .order("recorded_at",{ascending:false})
   .limit(7)

  if(!history || history.length < 2) continue

  const latest = history[0].health_score
  const previous = history[history.length-1].health_score

  const delta = latest - previous

  if(latest < 50){

   await supabase.from("vehicle_alerts").insert({
    vin:v.vin,
    alert_type:"critical_health",
    severity:"high",
    message:`Vehicle health critical (${latest})`
   })

  }

  if(delta < -10){

   await supabase.from("vehicle_alerts").insert({
    vin:v.vin,
    alert_type:"health_decline",
    severity:"medium",
    message:`Health dropped ${Math.abs(delta)} points`
   })

  }

 }

 return NextResponse.json({
  status:"alert check complete"
 })

}