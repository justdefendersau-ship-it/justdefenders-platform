/*
Timestamp: 5 March 2026 12:43
File: app/api/intelligence/reliability-index/route.ts

Defender Reliability Index Engine

Purpose
-------
Calculates reliability scores for Defender models
using community fleet data.

Formula
-------
Reliability = 100 - (failure_events / total_vehicles * 100)

Used for:
- fleet benchmarking
- insurance analytics
- predictive maintenance
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("model,engine")

  const { data: failures } = await supabase
    .from("maintenance_predictions")
    .select("vehicle_model")

  const modelCounts: Record<string, number> = {}
  const failureCounts: Record<string, number> = {}

  vehicles?.forEach(v => {

    const key = `${v.model}-${v.engine}`

    modelCounts[key] = (modelCounts[key] || 0) + 1

  })

  failures?.forEach(f => {

    const key = f.vehicle_model

    failureCounts[key] = (failureCounts[key] || 0) + 1

  })

  const results = []

  for (const key in modelCounts) {

    const total = modelCounts[key]
    const failures = failureCounts[key] || 0

    const reliability = 100 - (failures / total * 100)

    results.push({

      model: key,
      totalVehicles: total,
      failures,
      reliabilityScore: Number(reliability.toFixed(2))

    })

  }

  return NextResponse.json(results)

}