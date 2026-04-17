/*
========================================================
File: route.ts
Path: /app/api/vehicle-health/[vin]/route.ts
Timestamp: 15 March 2026 09:40
Project: JustDefenders Vehicle Intelligence Platform

Description:
Vehicle Health Score API.

Calculates an OEM-style health score for a Defender
based on telemetry, maintenance history, and failure
events stored in Supabase.

Example endpoint:
GET /api/vehicle-health/SALLDKAF8YA000006

The algorithm evaluates:

• coolant temperature behaviour
• battery voltage stability
• maintenance compliance
• failure history

This endpoint will later feed:

- VIN Intelligence page
- Fleet health dashboards
- Predictive maintenance engine

JustDefenders ©
========================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

/*
--------------------------------------------------------
Supabase client
--------------------------------------------------------
*/
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/*
--------------------------------------------------------
GET Vehicle Health Score
--------------------------------------------------------
*/
export async function GET(
  request: Request,
  { params }: { params: { vin: string } }
) {

  const vin = params.vin

  /*
  ----------------------------------------------------
  Fetch latest telemetry
  ----------------------------------------------------
  */
  const { data: telemetry } = await supabase
    .from("vehicle_telemetry")
    .select("*")
    .eq("vin", vin)
    .order("timestamp", { ascending: false })
    .limit(10)

  /*
  ----------------------------------------------------
  Fetch maintenance history
  ----------------------------------------------------
  */
  const { data: maintenance } = await supabase
    .from("maintenance_logs")
    .select("*")
    .eq("vin", vin)

  /*
  ----------------------------------------------------
  Fetch failure history
  ----------------------------------------------------
  */
  const { data: failures } = await supabase
    .from("defender_failures")
    .select("*")
    .eq("vin", vin)

  /*
  ----------------------------------------------------
  Health score baseline
  ----------------------------------------------------
  */
  let score = 100

  /*
  ----------------------------------------------------
  Coolant health
  ----------------------------------------------------
  */
  if (telemetry && telemetry.length > 0) {

    const temps = telemetry
      .map((t: any) => t.coolant_temp)
      .filter(Boolean)

    const avgTemp =
      temps.reduce((a: number, b: number) => a + b, 0) /
      (temps.length || 1)

    if (avgTemp > 105) score -= 25
    else if (avgTemp > 95) score -= 10
  }

  /*
  ----------------------------------------------------
  Battery health
  ----------------------------------------------------
  */
  if (telemetry && telemetry.length > 0) {

    const voltages = telemetry
      .map((t: any) => t.battery_voltage)
      .filter(Boolean)

    const avgVoltage =
      voltages.reduce((a: number, b: number) => a + b, 0) /
      (voltages.length || 1)

    if (avgVoltage < 12) score -= 20
    else if (avgVoltage < 12.5) score -= 10
  }

  /*
  ----------------------------------------------------
  Maintenance compliance
  ----------------------------------------------------
  */
  if (!maintenance || maintenance.length === 0) {
    score -= 10
  }

  /*
  ----------------------------------------------------
  Failure history
  ----------------------------------------------------
  */
  if (failures && failures.length > 0) {
    score -= failures.length * 2
  }

  /*
  ----------------------------------------------------
  Clamp score
  ----------------------------------------------------
  */
  if (score < 0) score = 0

  /*
  ----------------------------------------------------
  Determine health status
  ----------------------------------------------------
  */
  let status = "Excellent"

  if (score < 90) status = "Good"
  if (score < 70) status = "Warning"
  if (score < 50) status = "Critical"

  /*
  ----------------------------------------------------
  API response
  ----------------------------------------------------
  */
  return NextResponse.json({
    vin,
    health_score: score,
    status
  })
}