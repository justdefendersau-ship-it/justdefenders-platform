// Timestamp 6 March 2026 13:15
// File: /app/api/fleet/vehicles/route.ts

/*
Fleet Vehicles API

Returns vehicles belonging to an organization
with reliability and telemetry signals.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const org = searchParams.get("organization_id")

  if (!org) {

    return NextResponse.json(
      { error: "organization_id required" },
      { status: 400 }
    )

  }

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("organization_id", org)

  const enriched = []

  if (vehicles) {

    for (const v of vehicles) {

      const { data: telemetry } = await supabase
        .from("vehicle_telemetry")
        .select("*")
        .eq("vin", v.vin)
        .order("timestamp", { ascending: false })
        .limit(1)
        .single()

      const { data: risk } = await supabase
        .from("insurance_vehicle_risk")
        .select("*")
        .eq("vin", v.vin)
        .single()

      enriched.push({

        ...v,
        telemetry,
        risk

      })

    }

  }

  return NextResponse.json({

    vehicles: enriched

  })

}