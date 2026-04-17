// Timestamp 7 March 2026 03:20
// File: /app/api/analytics/graph-explorer/route.ts

/*
Reliability Intelligence Graph Explorer API
Returns nodes and edges for interactive exploration.
*/

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

    const { data } = await supabase
      .from("graph_hot_nodes")
      .select("*")
      .order("degree", { ascending: false })
      .limit(20)

    return NextResponse.json({
      nodes: data ?? [],
      edges: []
    })

  }

  const { data } = await supabase
    .from("graph_node_neighbors")
    .select("*")
    .eq("node_id", node)
    .single()

  const neighbors = data?.neighbors ?? []

  const nodes = [
    { id: node },
    ...neighbors.map((n: string) => ({ id: n }))
  ]

  const edges = neighbors.map((n: string) => ({
    source: node,
    target: n
  }))

  return NextResponse.json({
    nodes,
    edges
  })

}