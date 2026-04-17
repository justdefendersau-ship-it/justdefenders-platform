// Timestamp 7 March 2026 00:02
// File: /app/api/system/build-graph-index/route.ts

/*
Graph Query Optimization Engine

Precomputes node neighbors and degrees
for extremely fast graph queries.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Edge = {
  source_node: string
  target_node: string
}

export async function GET() {

  try {

    const { data: edges } = await supabase
      .from("failure_knowledge_graph_edges")
      .select("source_node, target_node")

    if (!edges) {

      return NextResponse.json({
        message: "No graph edges found"
      })

    }

    const neighborMap: Record<string, string[]> = {}

    for (const e of edges as Edge[]) {

      if (!neighborMap[e.source_node]) {

        neighborMap[e.source_node] = []

      }

      neighborMap[e.source_node].push(e.target_node)

    }

    for (const nodeId in neighborMap) {

      const neighbors = neighborMap[nodeId]

      await supabase
        .from("graph_node_neighbors")
        .upsert({

          node_id: nodeId,

          neighbors: neighbors,

          neighbor_count: neighbors.length,

          updated_at: new Date()

        })

      await supabase
        .from("graph_node_degree")
        .upsert({

          node_id: nodeId,

          degree: neighbors.length,

          updated_at: new Date()

        })

      if (neighbors.length > 10) {

        await supabase
          .from("graph_hot_nodes")
          .upsert({

            node_id: nodeId,

            degree: neighbors.length,

            node_type: "component",

            updated_at: new Date()

          })

      }

    }

    return NextResponse.json({

      message: "Graph index built",
      nodes_indexed: Object.keys(neighborMap).length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}