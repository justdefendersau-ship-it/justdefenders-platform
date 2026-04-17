"use client"

// Timestamp: 13 March 2026 19:15
// Knowledge Graph Viewer

import { useEffect, useState } from "react"

export default function KnowledgeGraphViewer({
  node
}: {
  node: string
}) {

  const [graph, setGraph] = useState<any>(null)

  useEffect(() => {

    async function loadGraph() {

      const res = await fetch(`/api/knowledge/graph?node=${node}`)
      const data = await res.json()

      setGraph(data)

    }

    loadGraph()

  }, [node])

  if (!graph) return null

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Knowledge Graph
      </h2>

      <div className="space-y-2">

        {graph.edges?.map((e: any, i: number) => (

          <div key={i} className="border rounded p-3">

            {e.source_id} → {e.relationship} → {e.target_id}

          </div>

        ))}

      </div>

    </div>

  )

}