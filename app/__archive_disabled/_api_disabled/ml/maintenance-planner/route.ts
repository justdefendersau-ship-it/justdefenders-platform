/*
Timestamp: 5 March 2026 17:25
File: app/api/ml/maintenance-planner/route.ts

Autonomous Maintenance Planner

Purpose
-------
Generates maintenance recommendations automatically
based on vehicle digital twin health metrics.

Inputs
------
vehicle age
system health

Outputs
-------
maintenance actions
priority levels
estimated cost
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function determineAction(health: number) {

  if (health < 40) {
    return { action: "Replace component", priority: "critical", cost: 1500 }
  }

  if (health < 60) {
    return { action: "Schedule maintenance", priority: "high", cost: 800 }
  }

  if (health < 80) {
    return { action: "Inspect during next service", priority: "medium", cost: 200 }
  }

  return { action: "No action required", priority: "low", cost: 0 }

}

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")

  const currentYear = new Date().getFullYear()

  const plans = vehicles?.map((vehicle: any) => {

    const age = vehicle.year
      ? currentYear - vehicle.year
      : 10

    const engineHealth = Math.max(0, 100 - age * 4)
    const coolingHealth = Math.max(0, 100 - age * 3)
    const drivetrainHealth = Math.max(0, 100 - age * 4.5)

    const enginePlan = determineAction(engineHealth)
    const coolingPlan = determineAction(coolingHealth)
    const drivetrainPlan = determineAction(drivetrainHealth)

    return {

      vehicleId: vehicle.id,

      recommendations: [

        {
          system: "Engine",
          health: Math.round(engineHealth),
          ...enginePlan
        },

        {
          system: "Cooling",
          health: Math.round(coolingHealth),
          ...coolingPlan
        },

        {
          system: "Drivetrain",
          health: Math.round(drivetrainHealth),
          ...drivetrainPlan
        }

      ]

    }

  }) || []

  return NextResponse.json(plans)

}