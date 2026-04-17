"use client"

// Timestamp: 14 March 2026 13:15
// Parts Search Panel with Cross Reference

import { useState } from "react"

export default function PartsSearchPanel() {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [xref, setXref] = useState<any>(null)

  async function searchParts() {

    const res = await fetch(`/api/parts/search?q=${query}`)
    const data = await res.json()

    setResults(data.parts || [])
    setXref(null)

  }

  async function loadCrossReference(part: string) {

    const res = await fetch(`/api/parts/cross-reference?part=${part}`)
    const data = await res.json()

    setXref(data)

  }

  return (

    <div className="bg-slate-800 text-white rounded-xl p-6 shadow">

      <h2 className="text-lg font-semibold mb-4">
        Global Parts Search
      </h2>

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          placeholder="Enter part number"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="flex-1 bg-slate-700 rounded px-3 py-2 text-sm"
        />

        <button
          onClick={searchParts}
          className="bg-green-500 px-4 py-2 rounded text-black font-semibold"
        >
          Search
        </button>

      </div>

      <div className="space-y-3">

        {results.map((p, i) => (

          <div
            key={i}
            onClick={()=>loadCrossReference(p.part_number)}
            className="border border-slate-700 rounded-lg p-3 hover:bg-slate-700 cursor-pointer"
          >

            <div className="font-semibold">
              {p.part_number}
            </div>

            <div className="text-sm text-slate-400">
              {p.description}
            </div>

          </div>

        ))}

      </div>

      {xref && (

        <div className="mt-6 border-t border-slate-700 pt-4">

          <h3 className="font-semibold mb-2">
            Cross Reference
          </h3>

          <div className="text-sm space-y-2">

            <div>
              <strong>Superseded By:</strong>
              {xref.supersessions.map((s:any)=>` ${s.new_part}`)}
            </div>

            <div>
              <strong>Aftermarket Equivalents:</strong>
              {xref.equivalents.map((e:any)=>` ${e.aftermarket_part}`)}
            </div>

            <div>
              <strong>Compatible Vehicles:</strong>
              {xref.compatibility.map((c:any)=>` ${c.vehicle_model}`)}
            </div>

          </div>

        </div>

      )}

    </div>

  )

}