/*
============================================================
JustDefenders
Monthly Market Revaluation Worker
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicles } =
    await supabase.from("vehicles").select("*")

  for (const v of vehicles || []) {

    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/market-value-scrape`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId: v.id })
      }
    )
  }

  return NextResponse.json({ success: true })
}