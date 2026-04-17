// Timestamp 7 March 2026
// File: /app/api/analytics/insurance-risk/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data: vehicles } = await supabase
    .from("insurance_vehicle_risk")
    .select("*")
    .order("insurance_risk_score", { ascending: false })
    .limit(20)

  const { data: fleets } = await supabase
    .from("insurance_fleet_risk")
    .select("*")
    .order("fleet_risk_score", { ascending: false })
    .limit(20)

  return NextResponse.json({

    vehicles,
    fleets

  })

}