// Timestamp 6 March 2026 15:00
// File: /app/api/root-cause-reports/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data } = await supabase
    .from("root_cause_reports")
    .select("*")
    .order("generated_at", { ascending: false })
    .limit(20)

  return NextResponse.json({

    reports: data ?? []

  })

}