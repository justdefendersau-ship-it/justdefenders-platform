// Timestamp 7 March 2026 01:00
// File: /app/api/ai/query-knowledge-graph/route.ts

/*
Knowledge Graph Query Engine

Allows querying relationships
between vehicles, components and suppliers.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const node = searchParams.get("node")

 const { data: edges } =
 await supabase
  .from("knowledge_graph_edges")
  .select("*")
  .or(`source_node.eq.${node},target_node.eq.${node}`)

 return NextResponse.json({

  node,
  relationships:edges

 })

}