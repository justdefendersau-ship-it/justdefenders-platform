// Timestamp 6 March 2026 18:20
// File: /app/api/marketplace/parts/route.ts

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
    .from("parts_marketplace")
    .select("*")
    .eq("part_number", part)
    .order("reliability_score", { ascending: false })

  return NextResponse.json({

    listings: data ?? []

  })

}