// Timestamp: 14 March 2026 09:30
// Vehicle Health Trend API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const vin = searchParams.get("vin")

  const { data } = await supabase
    .from("vehicle_health_scores")
    .select("score")
    .eq("vin", vin)
    .order("created_at", { ascending: false })
    .limit(10)

  const points = (data || []).map((d: any) => d.score)

  return NextResponse.json({ points })

}