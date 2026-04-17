// Timestamp: 13 March 2026 16:05
// Vehicle Health API

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
    .single()

  return NextResponse.json(data || { score: 0 })
}