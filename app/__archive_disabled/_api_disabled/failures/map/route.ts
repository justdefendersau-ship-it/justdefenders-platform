// Timestamp: 13 March 2026 17:00
// Fleet Failure Map API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  const supabase = getSupabaseServerClient()

  const { data } = await supabase
    .from("community_failure_reports")
    .select("component, latitude, longitude")
    .limit(100)

  const events = (data || []).map((d: any) => ({
    component: d.component,
    lat: d.latitude,
    lng: d.longitude
  }))

  return NextResponse.json({ events })

}