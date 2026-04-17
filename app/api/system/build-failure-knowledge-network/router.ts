// Timestamp 6 March 2026 22:40
// File: /app/api/system/build-failure-knowledge-network/route.ts

/*
Global Defender Failure Knowledge Network Builder

Constructs graph nodes and edges connecting
components, suppliers, and failure patterns.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type FailurePart = {
  part_number: string
  failure_rate: number
}

type SupplierPart = {
  supplier_id: string
  part_number: string
}

export async function GET() {

  try {

    const { data: parts } = await supabase
      .from("part_failure_registry")
      .select("part_number, failure_rate")

    const { data: suppliers } = await supabase
      .from("supplier_parts")
      .select("supplier_id, part_number")

    if (!parts || !suppliers) {

      return NextResponse.json({
        message: "Insufficient graph data"
      })

    }

    const nodes: any[] = []
    const edges: any[] = []

    for (const p of parts as FailurePart[]) {

      nodes.push({

        node_type: "component",

        node_id: p.part_number,

        label: p.part_number,

        metadata: { failure_rate: p.failure_rate }

      })

    }

    for (const s of suppliers as SupplierPart[]) {

      nodes.push({

        node_type: "supplier",

        node_id: s.supplier_id,

        label: `Supplier ${s.supplier_id}`

      })

      edges.push({

        source_node: s.supplier_id,

        target_node: s.part_number,

        relationship: "supplies",

        weight: 1

      })

    }

    for (const node of nodes) {

      await supabase
        .from("failure_knowledge_graph_nodes")
        .upsert(node)

    }

    for (const edge of edges) {

      await supabase
        .from("failure_knowledge_graph_edges")
        .upsert(edge)

    }

    return NextResponse.json({

      message: "Failure knowledge network built",

      nodes_created: nodes.length,
      edges_created: edges.length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}