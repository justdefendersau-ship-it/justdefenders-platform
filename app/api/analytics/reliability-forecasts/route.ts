// Timestamp 6 March 2026 20:42
// File: /app/api/analytics/reliability-forecasts/route.ts

/*
Reliability Forecast Analytics API

Returns strongest reliability forecasts.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data } = await supabase
      .from("reliability_forecasts")
      .select("*")
      .order("forecast_confidence", { ascending: false })
      .limit(50)

    return NextResponse.json({

      forecasts: data

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}