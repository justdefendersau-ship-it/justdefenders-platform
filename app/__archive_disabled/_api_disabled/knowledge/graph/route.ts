// Timestamp: 13 March 2026 19:15
// Knowledge Graph Query API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const node = searchParams.get("node")

  if (!node) {
    return NextResponse.json({ graph: null })
  }

  // node lookup
  const { data: nodes } = await supabase
    .from("knowledge_graph_nodes")
    .select("*")
    .eq("name", node)

  if (!nodes || nodes.length === 0) {
    return NextResponse.json({ graph: null })
  }

  const nodeId = nodes[0].id

  // edges connected to node
  const { data: edges } = await supabase
    .from("knowledge_graph_edges")
    .select(`
      source_id,
      target_id,
      relationship
    `)
    .or(`source_id.eq.${nodeId},target_id.eq.${nodeId}`)

  return NextResponse.json({
    node: nodes[0],
    edges
  })

}