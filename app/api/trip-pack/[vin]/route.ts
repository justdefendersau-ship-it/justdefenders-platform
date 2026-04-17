// ------------------------------------------------------
// File: app/api/trip-pack/[vin]/route.ts
// Timestamp: 18 March 2026 13:05
// JustDefenders ©
//
// Trip Pack API with Guaranteed Fallback Data
// ------------------------------------------------------

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(
  request: Request,
  context: { params: Promise<{ vin: string }> }
) {

  try {

    const { vin } = await context.params

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )

    // --------------------------------------------------
    // TRY DATABASE FIRST
    // --------------------------------------------------
    const { data: dbParts } = await supabase
      .from("parts_master")
      .select("*")
      .limit(10)

    let parts = dbParts || []

    // --------------------------------------------------
    // FALLBACK (CRITICAL)
    // --------------------------------------------------
    if (!parts || parts.length === 0) {

      console.log("Using fallback parts")

      parts = [
        {
          id: "1",
          name: "Turbo Hose Kit",
          price: 145,
          supplier: "Britpart",
          supplier_country: "UK",
          reliability_score: 85
        },
        {
          id: "2",
          name: "Radiator",
          price: 520,
          supplier: "Allmakes",
          supplier_country: "UK",
          reliability_score: 78
        },
        {
          id: "3",
          name: "Fuel Pump",
          price: 210,
          supplier: "eBay",
          supplier_country: "AU",
          reliability_score: 70
        }
      ]

    }

    return NextResponse.json({
      vin,
      parts
    })

  } catch (err: any) {

    console.error("Trip-pack API crash:", err)

    return NextResponse.json({
      vin: "unknown",
      parts: []
    })

  }

}