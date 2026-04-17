// Timestamp 6 March 2026 16:45
// File: /app/api/public/component-intelligence/route.ts

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

  const part = searchParams.get("part_number")

  const { data } = await supabase
    .from("component_failure_stats")
    .select("*")
    .eq("part_number", part)
    .single()

  return NextResponse.json({

    component: data

  })

}