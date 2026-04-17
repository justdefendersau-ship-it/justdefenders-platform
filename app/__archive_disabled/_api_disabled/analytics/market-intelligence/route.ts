// Timestamp 7 March 2026 02:10
// File: /app/api/analytics/market-intelligence/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data: demand } = await supabase
    .from("market_demand_forecasts")
    .select("*")
    .order("demand_score", { ascending: false })
    .limit(20)

  const { data: suppliers } = await supabase
    .from("supplier_market_share")
    .select("*")
    .order("market_share", { ascending: false })
    .limit(20)

  return NextResponse.json({

    demand,
    suppliers

  })

}