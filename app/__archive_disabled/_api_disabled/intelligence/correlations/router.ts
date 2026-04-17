// Timestamp: 1 March 2026 16:10
// Intelligence Correlations API - Fully App Router compatible

import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const partId = searchParams.get("partId")

    if (!partId) {
      return NextResponse.json(
        { error: "Missing partId parameter" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("correlations")
      .select("*")
      .eq("part_id", partId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    )
  }
}