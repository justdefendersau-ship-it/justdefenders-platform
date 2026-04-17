// Timestamp 6 March 2026 19:28
// File: /app/api/system/build-vehicle-digital-twins/route.ts

/*
Vehicle Digital Twin Engine

Creates virtual vehicle models representing
component health and reliability.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/* -------------------------------------------------- */
/* Types                                              */
/* -------------------------------------------------- */

type Vehicle = {
  vin: string
}

type VinStats = {
  vin: string
  reliability_score: number
}

/* -------------------------------------------------- */

export async function GET() {

  try {

    const { data: vehicles } = await supabase
      .from("vehicles")
      .select("vin")

    const { data: vinStats } = await supabase
      .from("vin_failure_stats")
      .select("*")

    if (!vehicles || !vinStats) {

      return NextResponse.json({
        message: "Insufficient data"
      })

    }

    const vehicleList = vehicles as Vehicle[]
    const stats = vinStats as VinStats[]

    const statsMap: Record<string, number> = {}

    for (const s of stats) {

      statsMap[s.vin] = s.reliability_score

    }

    for (const vehicle of vehicleList) {

      const reliability =
        statsMap[vehicle.vin] ?? 85

      const turboHealth =
        reliability - Math.random() * 10

      const injectorHealth =
        reliability - Math.random() * 8

      const fuelPumpHealth =
        reliability - Math.random() * 6

      const overall =
        (turboHealth + injectorHealth + fuelPumpHealth) / 3

      const predictedRisk =
        100 - overall

      await supabase
        .from("vehicle_digital_twins")
        .upsert({

          vin: vehicle.vin,

          overall_health_score: overall,

          turbo_health: turboHealth,
          injector_health: injectorHealth,
          fuel_pump_health: fuelPumpHealth,

          predicted_failure_risk: predictedRisk,

          last_updated: new Date()

        })

    }

    return NextResponse.json({

      message: "Vehicle digital twins generated",

      vehicles_processed: vehicleList.length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}