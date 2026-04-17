// Timestamp 7 March 2026
// File: /app/api/analytics/reliability-benchmarks/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data: benchmarks } = await supabase
    .from("global_reliability_benchmarks")
    .select("*")
    .order("industry_failure_rate", { ascending: false })
    .limit(20)

  const { data: signals } = await supabase
    .from("network_reliability_signals")
    .select("*")
    .order("severity", { ascending: false })
    .limit(20)

  return NextResponse.json({

    benchmarks,
    signals

  })

}