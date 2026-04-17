/*
============================================================
JustDefenders
Defender-Specific Depreciation
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function defenderDepreciation(
  purchasePrice: number,
  year: number,
  generation: string
) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - year

  let value = purchasePrice

  for (let i = 0; i < age; i++) {

    if (generation === "Puma")
      value *= 0.97

    else if (generation === "Td5")
      value *= 0.99

    else if (
      generation === "300Tdi" ||
      generation === "200Tdi" ||
      generation === "County"
    )
      value *= 1.02

    else
      value *= 0.95
  }

  return Math.round(value)
}

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

  if (!vehicle)
    return NextResponse.json(
      { error: "Vehicle not found" },
      { status: 400 }
    )

  const estimated =
    defenderDepreciation(
      Number(vehicle.purchase_price),
      Number(vehicle.year),
      vehicle.generation
    )

  await supabase
    .from("vehicles")
    .update({
      estimated_market_value: estimated,
      market_value_source: "Defender Depreciation Model",
      market_value_last_updated: new Date()
    })
    .eq("id", vehicleId)

  return NextResponse.json({
    estimated
  })
}