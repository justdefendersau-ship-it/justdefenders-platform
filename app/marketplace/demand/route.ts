// Timestamp 6 March 2026 19:00
// File: /app/api/marketplace/demand/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const part = searchParams.get("part_number")

  const { data } = await supabase
    .from("parts_demand_forecasts")
    .select("*")
    .eq("part_number", part)
    .order("generated_at", { ascending: false })
    .limit(1)
    .single()

  return NextResponse.json({

    forecast: data

  })

}