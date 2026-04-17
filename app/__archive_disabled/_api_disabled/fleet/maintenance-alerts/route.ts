// Timestamp 6 March 2026 13:15
// File: /app/api/fleet/maintenance-alerts/route.ts

/*
Predictive Maintenance Alerts API
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const org = searchParams.get("organization_id")

  const { data } = await supabase
    .from("maintenance_predictions")
    .select("*")
    .eq("organization_id", org)
    .order("predicted_failure_date", { ascending: true })
    .limit(20)

  return NextResponse.json({

    alerts: data ?? []

  })

}