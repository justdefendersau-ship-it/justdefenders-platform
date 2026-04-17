/*
=====================================================
CONFIDENCE SCORING (APP ROUTER SAFE)
Timestamp: 1 March 2026 15:45
=====================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function variance(values: number[]) {
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  return values.reduce((a, b) => a + (b - avg) ** 2, 0) / values.length
}

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const vehicle_id = searchParams.get("vehicle_id")

  if (!vehicle_id)
    return NextResponse.json({ confidence: 0 })

  const { data } = await supabase
    .from("fuel_logs")
    .select("l_per_100km")
    .eq("vehicle_id", vehicle_id)

  if (!data || data.length < 3)
    return NextResponse.json({ confidence: 0 })

  const values = data.map(d => d.l_per_100km)

  const depthScore = Math.min(values.length / 50, 1)
  const stabilityScore = variance(values) < 2 ? 1 : 0.5

  const confidence = (depthScore + stabilityScore) / 2

  return NextResponse.json({ confidence })
}