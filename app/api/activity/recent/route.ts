// Timestamp: 14 March 2026 02:40
// Recent Activity API (correct fields)

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  const supabase = getSupabaseServerClient()

  const { data } = await supabase
    .from("fuel_logs")
    .select(`
      created_at,
      vehicle_id,
      vehicles (
        vin,
        nickname,
        model
      )
    `)
    .order("created_at", { ascending: false })
    .limit(25)

  const activities = (data || []).map((row: any) => ({

    type: "fuel",
    status: "healthy",
    description: "Fuel entry recorded",
    created_at: row.created_at,
    vin: row.vehicles?.vin,
    vehicle: row.vehicles?.nickname || row.vehicles?.model || "Vehicle"

  }))

  return NextResponse.json({
    activities
  })

}