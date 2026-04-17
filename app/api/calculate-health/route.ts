/*
============================================================
JustDefenders
Defender Health Risk Score
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const { vehicleId } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicle } =
    await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicleId)
      .single()

  const { data: maintenance } =
    await supabase
      .from("maintenance_records")
      .select("*")
      .eq("vehicle_id", vehicleId)

  const { data: issues } =
    await supabase
      .from("defender_known_issues")
      .select("*")
      .eq("generation", vehicle.generation)

  let risk = 0

  risk += (issues?.length || 0) * 5

  if ((maintenance?.length || 0) < 5)
    risk += 15

  if (risk > 100) risk = 100

  const healthScore = 100 - risk

  await supabase
    .from("vehicles")
    .update({
      health_score: healthScore
    })
    .eq("id", vehicleId)

  return NextResponse.json({
    healthScore
  })
}