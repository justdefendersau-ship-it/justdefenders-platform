// Timestamp: 13 March 2026 16:30
// Failure Probability API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const vin = searchParams.get("vin")

  if (!vin) {
    return NextResponse.json({ components: [] })
  }

  const { data } = await supabase
    .from("vin_failure_predictions")
    .select("component, probability, km_window")
    .eq("vin", vin)
    .limit(5)

  return NextResponse.json({
    components: data || []
  })
}