// Timestamp 7 March 2026 00:40
// File: /app/api/analytics/anomalies/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data } = await supabase
    .from("reliability_anomalies")
    .select("*")
    .order("severity", { ascending: false })
    .limit(50)

  return NextResponse.json({
    anomalies: data ?? []
  })

}