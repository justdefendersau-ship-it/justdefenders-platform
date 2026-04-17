// Timestamp 7 March 2026 01:00
// File: /app/api/ai/build-knowledge-graph/route.ts

/*
Vehicle Reliability Knowledge Graph Builder

Builds graph nodes and relationships
from reliability datasets.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(){

 const nodes:any[] = []
 const edges:any[] = []

 const { data: components } =
 await supabase
  .from("component_failure_stats")
  .select("*")

 const { data: suppliers } =
 await supabase
  .from("supplier_parts")
  .select("*")

 for(const c of components ?? []){

  nodes.push({

   node_type:"component",
   entity_id:c.part_number,
   label:c.part_name ?? c.part_number

  })

 }

 for(const s of suppliers ?? []){

  nodes.push({

   node_type:"supplier",
   entity_id:s.supplier_id,
   label:"Supplier"

  })

  edges.push({

   source_node:s.supplier_id,
   target_node:s.part_number,
   relationship:"supplies_component",
   weight:1

  })

 }

 if(nodes.length){

  await supabase
   .from("knowledge_graph_nodes")
   .insert(nodes)

 }

 if(edges.length){

  await supabase
   .from("knowledge_graph_edges")
   .insert(edges)

 }

 return NextResponse.json({

  nodes_created:nodes.length,
  edges_created:edges.length

 })

}