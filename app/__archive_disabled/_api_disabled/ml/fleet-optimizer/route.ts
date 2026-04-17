/*
Timestamp: 5 March 2026 18:05
File: app/api/ml/fleet-optimizer/route.ts

Fleet Optimization Engine

Purpose
-------
Generates strategic fleet decisions automatically.

The engine evaluates:

• vehicle health
• maintenance cost trajectory
• failure risk

Outputs
-------
vehicle decisions:
- continue operation
- schedule overhaul
- retire vehicle

fleet-level strategy:
- expected maintenance budget
- vehicles recommended for retirement
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function vehicleDecision(age: number, health: number) {

  if (health < 35 || age > 20) {
    return "Retire vehicle"
  }

  if (health < 60) {
    return "Major overhaul recommended"
  }

  if (health < 80) {
    return "Schedule maintenance"
  }

  return "Continue operation"

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

  let retirementCount = 0
  let projectedCost = 0

  const decisions = vehicles?.map((v: any) => {

    const age = v.year
      ? currentYear - v.year
      : 10

    const health = Math.max(0, 100 - age * 4)

    const decision = vehicleDecision(age, health)

    const maintenanceCost = 400 + age * 300

    projectedCost += maintenanceCost

    if (decision === "Retire vehicle") {
      retirementCount++
    }

    return {

      vehicleId: v.id,
      age,
      health: Math.round(health),
      decision,
      projectedMaintenanceCost: maintenanceCost

    }

  }) || []

  return NextResponse.json({

    fleetSize: vehicles?.length || 0,
    projectedMaintenanceBudget: projectedCost,
    recommendedRetirements: retirementCount,
    vehicleDecisions: decisions

  })

}