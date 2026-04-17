// ------------------------------------------------------
// File: app/api/parts-search/route.ts
// Timestamp: 18 March 2026 10:32
// JustDefenders ©
//
// Ranked Parts Search API
// ------------------------------------------------------

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const categories = searchParams.get("categories")
  const region = searchParams.get("region") || "all"

  if (!categories) {
    return NextResponse.json([])
  }

  const categoryList = categories.split(",")

  let query = supabase
    .from("parts_master")
    .select("*")
    .in("category", categoryList)

  // Region filter
  if (region === "domestic") {
    query = query.eq("supplier_country", "Australia")
  }

  if (region === "global") {
    query = query.neq("supplier_country", "Australia")
  }

  const { data, error } = await query.limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Ranking logic
  const sorted = (data || []).sort((a: any, b: any) => {

    // Reliability first
    if ((b.reliability_score || 0) !== (a.reliability_score || 0)) {
      return (b.reliability_score || 0) - (a.reliability_score || 0)
    }

    // Then price (premium)
    return (b.price || 0) - (a.price || 0)

  })

  return NextResponse.json(sorted)

}