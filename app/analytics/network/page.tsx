// Timestamp 6 March 2026 22:40
// File: /app/analytics/network/page.tsx

"use client"

import { useEffect, useState } from "react"
import ForceGraph2D from "react-force-graph"

export default function FailureNetwork() {

  const [graph, setGraph] = useState<any>({
    nodes: [],
    links: []
  })

  useEffect(() => {

    fetch("/api/analytics/failure-network")
      .then(res => res.json())
      .then(data => {

        setGraph({

          nodes: data.nodes.map((n: any) => ({
            id: n.node_id,
            label: n.label
          })),

          links: data.edges.map((e: any) => ({
            source: e.source_node,
            target: e.target_node
          }))

        })

      })

  }, [])

  return (

    <div className="h-screen">

      <ForceGraph2D
        graphData={graph}
        nodeLabel="label"
      />

    </div>

  )

}