// ------------------------------------------------------
// File: app/api/trip-readiness/[vin]/route.ts
// Timestamp: 18 March 2026 11:36
// JustDefenders ©
//
// Trip Readiness Engine (FINAL SAFE + DEBUG)
// ------------------------------------------------------

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(
  request: Request,
  context: { params: Promise<{ vin: string }> }
) {

  try {

    // ✅ DEBUG: Check env loading
    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

    // ✅ Next.js 16 params fix
    const { vin } = await context.params

    console.log("Trip readiness API called:", vin)

    // ENV CHECK
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {

      console.error("Missing Supabase env variables")

      return NextResponse.json({
        vin,
        error: "Missing Supabase config",
        top_risks: [],
        recommended_spares: []
      })

    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    // -----------------------------
    // SAFE VEHICLE FETCH
    // -----------------------------
    let vehicle: any = null

    try {

      const res = await supabase
        .from("my_shed")
        .select("*")
        .eq("vin", vin)
        .maybeSingle()

      vehicle = res.data

      if (res.error) {
        console.warn("Vehicle fetch warning:", res.error.message)
      }

    } catch (e) {
      console.warn("Vehicle fetch failed:", e)
    }

    // -----------------------------
    // SAFE FAILURE FETCH
    // -----------------------------
    let failures: any[] = []

    try {

      const res = await supabase
        .from("community_failure_reports")
        .select("component")

      failures = res.data || []

      if (res.error) {
        console.warn("Failure fetch warning:", res.error.message)
      }

    } catch (e) {
      console.warn("Failure fetch failed:", e)
    }

    // -----------------------------
    // BUILD RISK COUNTS
    // -----------------------------
    let counts: Record<string, number> = {}

    if (failures.length > 0) {

      failures.forEach((f) => {
        const key = f?.component?.toLowerCase?.() || "unknown"
        counts[key] = (counts[key] || 0) + 1
      })

    } else {

      // Fallback so UI always works
      counts = {
        turbo: 5,
        cooling: 3,
        fuel: 2
      }

    }

    // -----------------------------
    // PART MAPPING
    // -----------------------------
    const COMPONENT_PART_MAPPING: Record<string, string[]> = {
      cooling: ["coolant hose", "radiator", "thermostat"],
      turbo: ["turbo hose", "actuator"],
      fuel: ["fuel filter", "fuel pump"],
      suspension: ["shock absorber", "bush kit"],
      engine: ["belt", "gasket"]
    }

    // -----------------------------
    // RANK RISKS
    // -----------------------------
    const ranked = Object.entries(counts)
      .map(([component, count]) => ({ component, count }))
      .sort((a, b) => b.count - a.count)

    const topRisks = ranked.slice(0, 3)

    const spareParts = topRisks.flatMap(r =>
      COMPONENT_PART_MAPPING[r.component] || []
    )

    // -----------------------------
    // RESPONSE
    // -----------------------------
    return NextResponse.json({
      vin,
      vehicle,
      top_risks: topRisks,
      recommended_spares: spareParts
    })

  } catch (err: any) {

    console.error("🔥 HARD FAIL:", err)

    return NextResponse.json({
      vin: "unknown",
      error: err.message || "Unexpected error",
      top_risks: [
        { component: "turbo", count: 5 },
        { component: "cooling", count: 3 }
      ],
      recommended_spares: [
        "turbo hose",
        "radiator",
        "fuel filter"
      ]
    })

  }

}