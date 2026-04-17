// Timestamp 6 March 2026 16:45
// File: /app/api/public/reliability-index/route.ts

/*
Public Reliability Intelligence API
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { validateApiKey } from "@/lib/api-auth"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

  const apiKey = req.headers.get("x-api-key")

  await validateApiKey(apiKey || "")

  const { searchParams } = new URL(req.url)

  const type = searchParams.get("type")

  const { data } = await supabase
    .from("defender_reliability_index")
    .select("*")
    .eq("entity_type", type)
    .order("reliability_score", { ascending: false })
    .limit(100)

  return NextResponse.json({

    results: data ?? []

  })

}