/*
=====================================================
FLEET PERCENTILE RANKING (APP ROUTER SAFE)
Timestamp: 1 March 2026 15:45
=====================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function percentileRank(arr: number[], value: number) {
  const sorted = [...arr].sort((a, b) => a - b)
  const index = sorted.indexOf(value)
  return arr.length > 0 ? (index / arr.length) * 100 : 0
}

export async function GET() {

  const { data } = await supabase
    .from("fuel_logs")
    .select("vehicle_id,l_per_100km")

  if (!data)
    return NextResponse.json([])

  const grouped: Record<string, number[]> = {}

  data.forEach(f => {
    if (!grouped[f.vehicle_id])
      grouped[f.vehicle_id] = []
    grouped[f.vehicle_id].push(f.l_per_100km)
  })

  const fleet = Object.entries(grouped).map(([id, arr]) => ({
    vehicle_id: id,
    avgFuel: arr.reduce((a, b) => a + b, 0) / arr.length
  }))

  const values = fleet.map(v => v.avgFuel)

  const ranked = fleet.map(v => ({
    ...v,
    percentile: percentileRank(values, v.avgFuel)
  }))

  return NextResponse.json(ranked)
}