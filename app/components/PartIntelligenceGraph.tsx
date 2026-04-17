"use client"

// Timestamp: 13 March 2026 18:00
// Part Intelligence Graph Viewer

import { useEffect, useState } from "react"

export default function PartIntelligenceGraph({
  part
}: {
  part: string
}) {

  const [graph, setGraph] = useState<any>(null)

  useEffect(() => {

    async function load() {

      const res = await fetch(`/api/parts/intelligence?part=${part}`)
      const data = await res.json()

      setGraph(data.graph)

    }

    load()

  }, [part])

  if (!graph) return null

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Part Intelligence
      </h2>

      {graph.oem && (
        <div className="mb-4">
          <strong>OEM Part</strong>
          <div>{graph.oem.part_number}</div>
        </div>
      )}

      {graph.superseded?.length > 0 && (
        <div className="mb-4">
          <strong>Superseded From</strong>
          {graph.superseded.map((s: any, i: number) => (
            <div key={i}>{s.old_part_number}</div>
          ))}
        </div>
      )}

      {graph.cross?.length > 0 && (
        <div className="mb-4">
          <strong>Aftermarket Equivalents</strong>
          {graph.cross.map((c: any, i: number) => (
            <div key={i}>{c.cross_part_number}</div>
          ))}
        </div>
      )}

      {graph.suppliers?.length > 0 && (
        <div>
          <strong>Available From</strong>
          {graph.suppliers.map((s: any, i: number) => (
            <div key={i}>
              {s.suppliers?.name} — {s.supplier_part_number}
            </div>
          ))}
        </div>
      )}

    </div>

  )
}