/*
Timestamp: 5 March 2026 09:50
File: app/api/risk/dashboard/route.ts

Fleet Risk Dashboard API

Returns organisation fleet risk analytics
from the risk_aggregates table.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from("risk_aggregates")
    .select("*")
    .limit(1)
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  const monte = data.monte_carlo_output || {}

  return NextResponse.json({
    fleetRiskScore: data.fleet_risk_score,
    exposureScore: data.exposure_score,
    expectedFailures: monte.expected_failures || 0,
    failureProbability: monte.failure_probability || 0,
    ifrsReserve: data.ifrs_reserve
  })

}