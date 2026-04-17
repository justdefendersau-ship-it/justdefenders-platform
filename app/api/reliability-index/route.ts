// Timestamp 6 March 2026 16:00
// File: /app/api/reliability-index/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const type = searchParams.get("type")

  const { data } = await supabase
    .from("defender_reliability_index")
    .select("*")
    .eq("entity_type", type)
    .order("reliability_score", { ascending: false })
    .limit(50)

  return NextResponse.json({

    results: data ?? []

  })

}