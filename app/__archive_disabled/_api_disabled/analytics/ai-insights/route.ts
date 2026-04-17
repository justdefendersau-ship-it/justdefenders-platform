// Timestamp 7 March 2026
// File: /app/api/analytics/ai-insights/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data } = await supabase
    .from("ai_reliability_insights")
    .select("*")
    .order("severity", { ascending: false })
    .limit(20)

  return NextResponse.json({

    insights: data ?? []

  })

}