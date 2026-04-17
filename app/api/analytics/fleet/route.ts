// Timestamp 6 March 2026 21:25
// File: /app/api/analytics/fleet/route.ts
// Fleet analytics API endpoint (NO JSX)

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data, error } = await supabase
    .from("fleet_digital_twin_simulations")
    .select("*")
    .order("simulated_at", { ascending: false })
    .limit(1)

  if (error) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }

  return NextResponse.json({
    fleet: data?.[0] ?? null
  })

}
