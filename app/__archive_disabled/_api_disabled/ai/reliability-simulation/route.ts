// Timestamp 6 March 2026 15:30
// File: /app/api/reliability-simulations/route.ts

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
    .from("reliability_simulations")
    .select("*")
    .eq("organization_id", org)
    .order("generated_at", { ascending: false })
    .limit(10)

  return NextResponse.json({

    simulations: data ?? []

  })

}