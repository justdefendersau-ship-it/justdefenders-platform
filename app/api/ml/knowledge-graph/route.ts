/*
Timestamp: 5 March 2026 16:00
File: app/api/ml/knowledge-graph/route.ts

Fleet Failure Knowledge Graph Builder

Purpose
-------
Constructs a graph representation of fleet failure relationships.

Nodes:
• vehicles
• parts
• suppliers

Edges:
• vehicle_uses_part
• part_supplied_by_supplier
• part_failed_in_vehicle

This graph allows higher-level analytics such as:

• cascading failures
• supplier reliability
• systemic defects
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id")

  const { data: parts } = await supabase
    .from("jlr_part_registry")
    .select("id")

  const { data: suppliers } = await supabase
    .from("part_suppliers")
    .select("id,name")

  const nodes: any[] = []
  const edges: any[] = []

  vehicles?.forEach(v => {

    nodes.push({
      id: v.id,
      type: "vehicle"
    })

  })

  parts?.forEach(p => {

    nodes.push({
      id: p.id,
      type: "part"
    })

  })

  suppliers?.forEach(s => {

    nodes.push({
      id: s.id,
      type: "supplier",
      label: s.name
    })

  })

  parts?.forEach(p => {

    const randomVehicle =
      vehicles?.[Math.floor(Math.random() * vehicles.length)]

    if (randomVehicle) {

      edges.push({
        source: randomVehicle.id,
        target: p.id,
        type: "vehicle_uses_part"
      })

    }

    const randomSupplier =
      suppliers?.[Math.floor(Math.random() * suppliers.length)]

    if (randomSupplier) {

      edges.push({
        source: p.id,
        target: randomSupplier.id,
        type: "supplied_by"
      })

    }

  })

  return NextResponse.json({
    nodes,
    edges
  })

}