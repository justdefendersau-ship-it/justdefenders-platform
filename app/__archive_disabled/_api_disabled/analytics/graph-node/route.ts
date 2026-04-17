// Timestamp 7 March 2026 00:02
// File: /app/api/analytics/graph-node/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const node = searchParams.get("node")

  if (!node) {

    return NextResponse.json({
      error: "node parameter required"
    }, { status: 400 })

  }

  const { data } = await supabase
    .from("graph_node_neighbors")
    .select("*")
    .eq("node_id", node)
    .single()

  return NextResponse.json({
    node,
    neighbors: data?.neighbors ?? []
  })

}