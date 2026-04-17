/*
JustDefenders ©
Vehicle Health Query Layer

File: app/lib/vehicleHealth.ts
Timestamp: 15 March 2026 16:58
*/

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface HealthTrendPoint {
  value: number
}

export async function getVehicleHealthTrend(vin: string, limit: number = 30) {

  const { data, error } = await supabase
    .from("vehicle_health_history")
    .select("health_score, recorded_at")
    .eq("vin", vin)
    .order("recorded_at", { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  /*
  Normalize output
  */

  const trend: HealthTrendPoint[] = (data || [])
    .reverse()
    .map((row: any) => ({
      value: row.health_score
    }))

  return trend
}