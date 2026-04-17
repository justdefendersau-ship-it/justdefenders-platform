// Timestamp 6 March 2026 14:30
// File: /app/api/investigation/search/route.ts

/*
Failure Investigation API

Allows engineers to search for reliability signals
across vehicles, components, suppliers and AI insights.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const query = searchParams.get("q")

  if (!query) {

    return NextResponse.json(
      { error: "Search query required" },
      { status: 400 }
    )

  }

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .ilike("vin", `%${query}%`)
    .limit(5)

  const { data: components } = await supabase
    .from("component_failure_stats")
    .select("*")
    .ilike("part_number", `%${query}%`)
    .limit(5)

  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(5)

  const { data: insights } = await supabase
    .from("ai_reliability_insights")
    .select("*")
    .ilike("description", `%${query}%`)
    .limit(5)

  return NextResponse.json({

    vehicles,
    components,
    suppliers,
    insights

  })

}