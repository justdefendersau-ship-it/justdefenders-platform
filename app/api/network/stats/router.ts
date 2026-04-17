// Timestamp 6 March 2026 17:15
// File: /app/api/network/stats/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data: fleets } = await supabase
    .from("reliability_network_members")
    .select("fleet_size")

  const { data: events } = await supabase
    .from("reliability_network_events")
    .select("id")

  const totalVehicles =
    fleets?.reduce((sum, f) => sum + (f.fleet_size ?? 0), 0) ?? 0

  const totalEvents = events?.length ?? 0

  return NextResponse.json({

    fleets_connected: fleets?.length ?? 0,
    vehicles_in_network: totalVehicles,
    reliability_events: totalEvents

  })

}