/*
Timestamp: 5 March 2026 14:05
File: app/api/ml/monte-carlo/route.ts

Monte Carlo Fleet Failure Simulation

Purpose
-------
Simulates thousands of possible fleet failure scenarios to estimate:

• expected failures
• worst case failures
• insurance exposure

This is a simplified simulation used by fleet analytics platforms
and insurance underwriting models.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function simulateFailure(probability: number) {
  return Math.random() < probability ? 1 : 0
}

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")

  const fleetSize = vehicles?.length || 0

  const baseFailureProbability = 0.08

  const simulations = 10000
  const results: number[] = []

  for (let i = 0; i < simulations; i++) {

    let failures = 0

    for (let v = 0; v < fleetSize; v++) {

      failures += simulateFailure(baseFailureProbability)

    }

    results.push(failures)

  }

  const expectedFailures =
    results.reduce((a, b) => a + b, 0) / simulations

  const worstCase = Math.max(...results)

  const insuranceExposure = expectedFailures * 2000

  return NextResponse.json({

    fleetSize,
    expectedFailures: Number(expectedFailures.toFixed(2)),
    worstCaseFailures: worstCase,
    insuranceExposure: Number(insuranceExposure.toFixed(0))

  })

}