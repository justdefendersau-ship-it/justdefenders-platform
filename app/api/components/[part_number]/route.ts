// Timestamp 6 March 2026 14:00
// File: /app/api/components/[part_number]/route.ts

/*
Component Intelligence API

Returns reliability analytics
for a specific component.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: Request,
  { params }: { params: { part_number: string } }
) {

  const part = params.part_number

  const { data: component } = await supabase
    .from("component_failure_stats")
    .select("*")
    .eq("part_number", part)
    .single()

  const { data: suppliers } = await supabase
    .from("supplier_parts")
    .select("*")
    .eq("part_number", part)

  const { data: benchmark } = await supabase
    .from("global_reliability_benchmarks")
    .select("*")
    .eq("component", part)
    .single()

  const { data: demand } = await supabase
    .from("market_demand_forecasts")
    .select("*")
    .eq("part_number", part)
    .single()

  return NextResponse.json({

    component,
    suppliers,
    benchmark,
    demand

  })

}