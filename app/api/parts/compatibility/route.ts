// Timestamp: 13 March 2026 17:25
// Parts Compatibility API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)

  const vin = searchParams.get("vin")
  const part = searchParams.get("part")

  if (!vin || !part) {
    return NextResponse.json({
      compatible: false
    })
  }

  // get vehicle configuration
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("model, engine, year")
    .eq("vin", vin)
    .single()

  if (!vehicle) {
    return NextResponse.json({
      compatible: false
    })
  }

  // check compatibility
  const { data: compatibility } = await supabase
    .from("parts_compatibility")
    .select("*")
    .eq("part_number", part)

  if (!compatibility || compatibility.length === 0) {
    return NextResponse.json({
      compatible: "unknown"
    })
  }

  const match = compatibility.find((c: any) => {

    return (
      c.model === vehicle.model &&
      (!c.engine || c.engine === vehicle.engine)
    )

  })

  if (match) {
    return NextResponse.json({
      compatible: true,
      vehicle,
      part
    })
  }

  return NextResponse.json({
    compatible: false,
    vehicle,
    part
  })

}