// Timestamp 6 March 2026 19:00
// File: /app/api/ai/demand-forecast/route.ts

/*
Automated Parts Demand Forecast Engine

Estimates future parts demand using
failure rates and fleet size.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const { horizon_days } = body

  const { data: components } = await supabase
    .from("component_failure_stats")
    .select("*")

  const { data: fleets } = await supabase
    .from("reliability_network_members")
    .select("fleet_size")

  const totalFleetSize =
    fleets?.reduce((sum, f) => sum + (f.fleet_size ?? 0), 0) ?? 0

  const forecasts = []

  if (components) {

    for (const c of components) {

      const rate = c.failure_rate ?? 0.01

      const predictedFailures =
        Math.round(totalFleetSize * rate)

      const predictedDemand =
        Math.round(predictedFailures * 1.1)

      forecasts.push({

        part_number: c.part_number,
        forecast_horizon_days: horizon_days,
        predicted_failures: predictedFailures,
        predicted_demand: predictedDemand,
        confidence: Math.min(1, (c.vehicles_affected ?? 0) / 100)

      })

    }

  }

  if (forecasts.length > 0) {

    await supabase
      .from("parts_demand_forecasts")
      .insert(forecasts)

  }

  return NextResponse.json({

    forecasts_generated: forecasts.length

  })

}