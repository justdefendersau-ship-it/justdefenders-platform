/*
Timestamp: 5 March 2026 14:50
File: app/api/intelligence/global-map/route.ts

Global Defender Intelligence Map API

Purpose
-------
Provides geographic fleet intelligence data for map visualization.

Returns
-------
vehicle failure locations
reliability scores
regional fleet analytics
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("defender_intelligence_map")
    .select("country,region,latitude,longitude,failure_event,reliability_score")

  return NextResponse.json(data || [])

}