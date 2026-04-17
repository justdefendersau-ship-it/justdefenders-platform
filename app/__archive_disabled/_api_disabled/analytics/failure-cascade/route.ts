// Timestamp 6 March 2026 17:32
// File: /app/api/analytics/failure-cascade/route.ts

/*
Failure Cascade Analytics API

Returns predicted cascading failures for a component.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url)

    const part = searchParams.get("part")

    if (!part) {

      return NextResponse.json({
        error: "part parameter required"
      }, { status: 400 })

    }

    const { data } = await supabase
      .from("failure_cascade_predictions")
      .select("*")
      .eq("source_part", part)
      .order("cascade_probability", { ascending: false })
      .limit(10)

    return NextResponse.json({

      source_part: part,
      predictions: data

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}