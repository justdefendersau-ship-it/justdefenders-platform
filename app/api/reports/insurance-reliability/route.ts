// Timestamp 6 March 2026 21:10
// File: /app/api/reports/insurance-reliability/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const org = searchParams.get("organization")

  if (!org) {

    return NextResponse.json({
      error: "organization parameter required"
    }, { status: 400 })

  }

  const { data: fleet } = await supabase
    .from("fleet_digital_twin_simulations")
    .select("*")
    .eq("organization_id", org)
    .order("simulated_at", { ascending: false })
    .limit(1)

  const { data: forecasts } = await supabase
    .from("reliability_forecasts")
    .select("*")
    .order("forecast_confidence", { ascending: false })
    .limit(10)

  return NextResponse.json({

    organization: org,

    fleet_summary: fleet?.[0],

    reliability_forecasts: forecasts

  })

}