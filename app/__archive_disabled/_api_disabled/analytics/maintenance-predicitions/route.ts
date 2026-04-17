// Timestamp 6 March 2026 18:05
// File: /app/api/analytics/maintenance-predictions/route.ts

/*
Maintenance Predictions API

Returns predicted component failures for a VIN.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url)

    const vin = searchParams.get("vin")

    if (!vin) {

      return NextResponse.json({
        error: "VIN parameter required"
      }, { status: 400 })

    }

    const { data } = await supabase
      .from("fleet_maintenance_predictions")
      .select("*")
      .eq("vin", vin)
      .order("risk_score", { ascending: false })
      .limit(10)

    return NextResponse.json({

      vin,
      predictions: data

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}