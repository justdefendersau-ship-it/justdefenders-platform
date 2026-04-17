/*
Timestamp: 5 March 2026 15:05
File: app/api/ml/digital-twin/route.ts

Fleet Digital Twin Simulation Engine

Purpose
-------
Creates a digital twin model for every vehicle in the fleet.

Each twin calculates:

• engine health
• drivetrain health
• cooling system health
• remaining useful life
• predicted maintenance cost

This forms the foundation of a predictive maintenance platform.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function calculateHealth(age: number) {

  const health = Math.max(0, 100 - age * 4)

  return health

}

function calculateRUL(age: number) {

  const maxLife = 25

  return Math.max(0, maxLife - age)

}

function maintenanceCost(age: number) {

  return 500 + age * 350

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

  const twins = vehicles?.map((vehicle: any) => {

    const age = vehicle.year
      ? currentYear - vehicle.year
      : 10

    const engineHealth = calculateHealth(age)
    const drivetrainHealth = calculateHealth(age * 1.1)
    const coolingHealth = calculateHealth(age * 0.9)

    const rul = calculateRUL(age)

    const predictedCost = maintenanceCost(age)

    return {

      vehicleId: vehicle.id,

      engineHealth: Math.round(engineHealth),
      drivetrainHealth: Math.round(drivetrainHealth),
      coolingHealth: Math.round(coolingHealth),

      remainingUsefulLife: rul,

      predictedMaintenanceCost: predictedCost

    }

  }) || []

  return NextResponse.json(twins)

}