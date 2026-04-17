"use client"

// Timestamp 7 March 2026 03:20
// File: /app/analytics/graph-explorer/page.tsx

import { useEffect, useState } from "react"
import ForceGraph2D from "react-force-graph-2d"

export default function GraphExplorer() {

  const [graph, setGraph] = useState<any>({
    nodes: [],
    links: []
  })

  useEffect(() => {

    fetch("/api/analytics/graph-explorer")
      .then(res => res.json())
      .then(data => {

        setGraph({

          nodes: data.nodes.map((n: any) => ({
            id: n.node_id || n.id
          })),

          links: data.edges.map((e: any) => ({
            source: e.source,
            target: e.target
          }))

        })

      })

  }, [])

  function expandNode(node: any) {

    fetch(`/api/analytics/graph-explorer?node=${node.id}`)
      .then(res => res.json())
      .then(data => {

        setGraph((prev: any) => ({

          nodes: [
            ...prev.nodes,
            ...data.nodes
          ],

          links: [
            ...prev.links,
            ...data.edges.map((e: any) => ({
              source: e.source,
              target: e.target
            }))
          ]

        }))

      })

  }

  return (

    <div className="h-screen">

      <ForceGraph2D

        graphData={graph}

        onNodeClick={expandNode}

        nodeLabel={(node: any) => node.id}

      />

    </div>

  )

}