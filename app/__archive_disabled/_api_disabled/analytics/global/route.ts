// Timestamp 6 March 2026 21:38
// File: /app/api/analytics/global/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data, error } = await supabase
    .from("reliability_forecasts")
    .select("*")
    .order("forecast_confidence", { ascending: false })
    .limit(20)

  if (error) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }

  return NextResponse.json({
    signals: data ?? []
  })

}