/*
Timestamp: 5 March 2026 10:25
File: app/api/risk/recalculate/route.ts

Purpose
-------
Recalculate fleet risk and store a historical snapshot.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")

  const vehicleCount = vehicles?.length || 0

  const fleetRiskScore = Math.max(0, 100 - vehicleCount * 2)

  const expectedFailures = Math.ceil(vehicleCount * 0.1)

  const failureProbability = vehicleCount > 0
    ? expectedFailures / vehicleCount
    : 0

  const ifrsReserve = expectedFailures * 1000

  const organizationId = vehicles?.[0]?.organization_id

  if (!organizationId) {
    return NextResponse.json({ error: "No organization found" })
  }

  /* Update aggregate table */

  await supabase
    .from("risk_aggregates")
    .update({
      fleet_risk_score: fleetRiskScore,
      exposure_score: 0,
      monte_carlo_output: {
        expected_failures: expectedFailures,
        failure_probability: failureProbability
      },
      ifrs_reserve: ifrsReserve,
      updated_at: new Date()
    })
    .eq("organization_id", organizationId)

  /* Insert history snapshot */

  await supabase
    .from("risk_history")
    .insert({
      organization_id: organizationId,
      fleet_risk_score: fleetRiskScore,
      exposure_score: 0,
      expected_failures: expectedFailures,
      failure_probability: failureProbability,
      ifrs_reserve: ifrsReserve
    })

  return NextResponse.json({
    success: true
  })

}