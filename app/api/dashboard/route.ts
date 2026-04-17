// Timestamp: 3 March 2026 09:10
// Production Dashboard API - Stable & Typed

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(): Promise<NextResponse> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: "Supabase not configured" },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const [
      { count: vehicleCount },
      { count: fuelCount },
      { count: workshopCount }
    ] = await Promise.all([
      supabase.from("vehicles").select("*", { count: "exact", head: true }),
      supabase.from("fuel_logs").select("*", { count: "exact", head: true }),
      supabase.from("workshop_jobs").select("*", { count: "exact", head: true })
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalVehicles: vehicleCount ?? 0,
        totalFuelEntries: fuelCount ?? 0,
        totalWorkshopJobs: workshopCount ?? 0
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Dashboard failed" },
      { status: 500 }
    )
  }
}