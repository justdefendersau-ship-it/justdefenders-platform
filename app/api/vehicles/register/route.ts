// Timestamp: 13 March 2026 13:40
// Vehicle Registration API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"
import { decodeDefenderVIN } from "@/lib/vinDecoder"

export async function POST(req: Request) {

  const supabase = getSupabaseServerClient()

  const body = await req.json()
  const vin = body.vin?.toUpperCase()

  if (!vin || vin.length !== 17) {
    return NextResponse.json(
      { error: "Invalid VIN" },
      { status: 400 }
    )
  }

  // Check VIN cache
  const { data: existingVIN } = await supabase
    .from("vin_registry")
    .select("*")
    .eq("vin", vin)
    .single()

  let decoded = existingVIN

  if (!decoded) {

    const vinDecoded = decodeDefenderVIN(vin)

    if (!vinDecoded) {
      return NextResponse.json(
        { error: "Unable to decode VIN" },
        { status: 400 }
      )
    }

    const { data: inserted } = await supabase
      .from("vin_registry")
      .insert({
        vin,
        make: vinDecoded.make,
        model: vinDecoded.model,
        engine: vinDecoded.engine,
        gearbox: vinDecoded.gearbox,
        model_year: vinDecoded.year,
        decoded_source: "local_decoder"
      })
      .select()
      .single()

    decoded = inserted
  }

  const { data: vehicle } = await supabase
    .from("vehicles")
    .insert({
      vin,
      make: decoded.make,
      model: decoded.model,
      engine: decoded.engine,
      year: decoded.model_year
    })
    .select()
    .single()

  await supabase
    .from("vehicle_configuration")
    .insert({
      vin,
      current_engine: decoded.engine,
      current_gearbox: decoded.gearbox
    })

  return NextResponse.json({
    success: true,
    vehicle
  })
}