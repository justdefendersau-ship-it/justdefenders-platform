/*
Vehicle Intelligence API
Timestamp: 13 March 2026 18:32
Returns intelligence metrics for vehicle
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
req:Request,
{ params }:{ params:{ vin:string }}
){

const vin = params.vin

const { data:health } = await supabase
.from("vehicle_health_scores")
.select("health_score,reliability_score")
.eq("vin",vin)
.single()

const { data:prediction } = await supabase
.from("vehicle_failure_predictions")
.select("failure_risk,maintenance_risk")
.eq("vin",vin)
.single()

return NextResponse.json({

health_score:health?.health_score || 0,
reliability_score:health?.reliability_score || 0,
failure_risk:prediction?.failure_risk || "unknown",
maintenance_risk:prediction?.maintenance_risk || "unknown"

})

}