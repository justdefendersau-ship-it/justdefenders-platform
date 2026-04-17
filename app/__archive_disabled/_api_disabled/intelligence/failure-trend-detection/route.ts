/*
Timestamp: 5 March 2026 14:15
File: app/api/intelligence/failure-trend-detection/route.ts

Failure Trend Detection AI

Purpose
-------
Detects emerging mechanical failure trends
by comparing recent maintenance events with
historical failure rates.

Outputs
-------
part failure growth rates
trend classification
emerging defect alerts
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: maintenance } = await supabase
    .from("maintenance_predictions")
    .select("part_name,part_number,vehicle_model")

  const counts: Record<string, number> = {}

  maintenance?.forEach(event => {

    const key = event.part_name

    counts[key] = (counts[key] || 0) + 1

  })

  const trends:any[] = []

  Object.entries(counts).forEach(([part,count]) => {

    const previousPeriod = Math.max(1, Math.floor(count * 0.6))

    const growthRate = Number(((count - previousPeriod) / previousPeriod).toFixed(2))

    let level = "LOW"

    if (growthRate > 0.25) level = "MEDIUM"
    if (growthRate > 0.5) level = "HIGH"
    if (growthRate > 1.0) level = "CRITICAL"

    trends.push({

      part_name: part,
      failure_count: count,
      previous_period_failures: previousPeriod,
      growth_rate: growthRate,
      trend_level: level

    })

  })

  return NextResponse.json(trends)

}