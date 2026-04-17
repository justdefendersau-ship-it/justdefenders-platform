// ------------------------------------------------------
// File: app/api/failure-map/route.ts
// Timestamp: 18 March 2026 01:55
// JustDefenders ©
//
// Global Defender Failure Map API
// Returns geo-located failure reports
// ------------------------------------------------------

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data, error } = await supabase
    .from("community_failure_reports")
    .select(`
      vin,
      component,
      failure_type,
      latitude,
      longitude,
      report_date
    `)
    .not("latitude", "is", null)
    .not("longitude", "is", null)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)

}