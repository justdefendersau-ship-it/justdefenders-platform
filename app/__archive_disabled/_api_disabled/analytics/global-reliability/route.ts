// Timestamp 7 March 2026 01:45
// File: /app/api/analytics/global-reliability/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data: components } = await supabase
    .from("global_component_reliability")
    .select("*")
    .order("failure_rate", { ascending: false })
    .limit(20)

  const { data: suppliers } = await supabase
    .from("global_supplier_reliability")
    .select("*")
    .order("average_failure_rate", { ascending: false })
    .limit(20)

  return NextResponse.json({

    components,
    suppliers

  })

}