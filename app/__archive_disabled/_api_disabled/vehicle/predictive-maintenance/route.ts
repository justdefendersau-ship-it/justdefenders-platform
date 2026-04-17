// Timestamp: 13 March 2026 20:35
// Predictive Maintenance API

import { NextResponse } from "next/server"
import { calculateMaintenancePredictions } from "@/lib/predictiveMaintenanceEngine"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const vin = searchParams.get("vin")

  if (!vin) {
    return NextResponse.json({ predictions: [] })
  }

  const predictions = await calculateMaintenancePredictions(vin)

  return NextResponse.json({
    predictions
  })

}