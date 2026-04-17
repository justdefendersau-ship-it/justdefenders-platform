/*
Timestamp: 5 March 2026 13:20
File: app/api/ml/predictions/route.ts

Machine Learning Failure Prediction API

Purpose
-------
Calculates failure probability for major vehicle systems using
a simple predictive model.

The model uses fleet size as a proxy risk variable.
This provides a realistic prediction surface that can later be
replaced by a trained machine learning model.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function logisticProbability(x: number) {

  return 1 / (1 + Math.exp(-x))

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

  const engineRisk = logisticProbability(fleetSize * 0.08)
  const turboRisk = logisticProbability(fleetSize * 0.12)
  const injectorRisk = logisticProbability(fleetSize * 0.09)
  const coolingRisk = logisticProbability(fleetSize * 0.07)

  return NextResponse.json({

    engine: Number(engineRisk.toFixed(2)),
    turbocharger: Number(turboRisk.toFixed(2)),
    injectors: Number(injectorRisk.toFixed(2)),
    coolingSystem: Number(coolingRisk.toFixed(2))

  })

}