// Timestamp 6 March 2026 16:32
// File: /app/api/analytics/failure-relationships/route.ts

/*
Failure Relationship Analytics API

Returns strongest component failure relationships.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data } = await supabase
      .from("failure_relationships")
      .select("*")
      .order("relationship_strength", { ascending: false })
      .limit(50)

    return NextResponse.json({
      relationships: data
    })

  } catch (err: any) {

    return NextResponse.json({
      error: err.message
    }, { status: 500 })

  }

}