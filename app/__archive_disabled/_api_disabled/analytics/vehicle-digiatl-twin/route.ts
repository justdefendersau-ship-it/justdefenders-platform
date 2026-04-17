// Timestamp 6 March 2026 19:28
// File: /app/api/analytics/vehicle-digital-twin/route.ts

/*
Vehicle Digital Twin Analytics API

Returns the digital twin model for a VIN.
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
      .from("vehicle_digital_twins")
      .select("*")
      .eq("vin", vin)
      .single()

    return NextResponse.json({

      vin,
      digital_twin: data

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}