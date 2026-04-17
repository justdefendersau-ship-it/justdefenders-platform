/*
JustDefenders ©
Vehicle Health Trend API

File: app/api/analytics/vehicle-health-trend/route.ts
Timestamp: 15 March 2026 16:44
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url)

    const vin = searchParams.get("vin")

    if (!vin) {
      return NextResponse.json(
        { error: "VIN parameter required" },
        { status: 400 }
      )
    }

    /*
    Query health history
    */

    const { data, error } = await supabase
      .from("vehicle_health_history")
      .select("health_score, recorded_at")
      .eq("vin", vin)
      .order("recorded_at", { ascending: false })
      .limit(30)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    /*
    Normalize output for sparkline
    */

    const trend = (data || [])
      .reverse()
      .map((row: any) => ({
        value: row.health_score
      }))

    return NextResponse.json({
      vin,
      trend
    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}