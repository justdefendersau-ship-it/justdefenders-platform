/*
Timestamp: 5 March 2026 16:05
File: app/components/FleetKnowledgeGraph.tsx

Purpose
-------
Displays fleet failure knowledge graph.

Shows relationships between:

• vehicles
• parts
• suppliers

This helps identify systemic failures and supplier correlations.
*/

"use client"

import { useEffect, useState } from "react"

type Node = {

  id: string
  type: string
  label?: string

}

type Edge = {

  source: string
  target: string
  type: string

}

export default function FleetKnowledgeGraph() {

  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  useEffect(() => {

    async function loadGraph() {

      const res = await fetch("/api/ml/knowledge-graph")
      const json = await res.json()

      setNodes(json.nodes)
      setEdges(json.edges)

    }

    loadGraph()

  }, [])

  if (!nodes.length) {

    return <div>Building fleet knowledge graph...</div>

  }

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Fleet Failure Knowledge Graph
      </h2>

      <div className="text-sm text-gray-600 mb-4">

        Nodes: {nodes.length}  
        Relationships: {edges.length}

      </div>

      <div className="space-y-2 text-xs">

        {edges.slice(0, 20).map((e, i) => (

          <div key={i}>

            {e.source} → {e.type} → {e.target}

          </div>

        ))}

      </div>

    </div>

  )

}