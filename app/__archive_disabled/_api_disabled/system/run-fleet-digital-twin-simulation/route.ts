// Timestamp 6 March 2026 20:05
// File: /app/api/system/run-fleet-digital-twin-simulation/route.ts

/*
Fleet Digital Twin Simulation Engine

Simulates reliability and failure probabilities
across entire fleets of Defender vehicles.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Twin = {
  vin: string
  overall_health_score: number
  predicted_failure_risk: number
}

type Vehicle = {
  vin: string
  organization_id: string
}

export async function GET() {

  try {

    const { data: vehicles } = await supabase
      .from("vehicles")
      .select("vin, organization_id")

    const { data: twins } = await supabase
      .from("vehicle_digital_twins")
      .select("*")

    if (!vehicles || !twins) {

      return NextResponse.json({
        message: "Insufficient data"
      })

    }

    const vehicleList = vehicles as Vehicle[]
    const twinList = twins as Twin[]

    const twinMap: Record<string, Twin> = {}

    for (const twin of twinList) {

      twinMap[twin.vin] = twin

    }

    const fleets: Record<string, Twin[]> = {}

    for (const vehicle of vehicleList) {

      const twin = twinMap[vehicle.vin]

      if (!twin) continue

      if (!fleets[vehicle.organization_id]) {

        fleets[vehicle.organization_id] = []

      }

      fleets[vehicle.organization_id].push(twin)

    }

    let simulationsCreated = 0

    for (const orgId in fleets) {

      const fleet = fleets[orgId]

      const fleetSize = fleet.length

      const avgHealth =
        fleet.reduce((sum, v) => sum + v.overall_health_score, 0) /
        fleetSize

      const predictedFailures =
        fleet.filter(v => v.predicted_failure_risk > 30).length

      const riskPercentage =
        (predictedFailures / fleetSize) * 100

      await supabase
        .from("fleet_digital_twin_simulations")
        .upsert({

          organization_id: orgId,

          fleet_size: fleetSize,

          average_health_score: avgHealth,

          predicted_failures: predictedFailures,

          top_risk_component: "Turbocharger",

          risk_percentage: riskPercentage,

          simulated_at: new Date()

        })

      simulationsCreated++

    }

    return NextResponse.json({

      message: "Fleet digital twin simulations complete",

      fleets_simulated: simulationsCreated

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}