// Timestamp 6 March 2026 22:40
// File: /app/api/analytics/failure-network/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data: nodes } = await supabase
    .from("failure_knowledge_graph_nodes")
    .select("*")

  const { data: edges } = await supabase
    .from("failure_knowledge_graph_edges")
    .select("*")

  return NextResponse.json({

    nodes: nodes ?? [],
    edges: edges ?? []

  })

}