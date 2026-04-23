'use client'

import { useState } from 'react'

export default function DashboardNew() {

  const [query, setQuery] = useState('')
  const [data, setData] = useState<any>({ results: [] })

  async function search() {
    const res = await fetch('http://localhost:4000/api/parts?q=' + query)
    const json = await res.json()
    setData(json)
  }

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "20px" }}>

      {/* HEADER */}
      <div style={{
        background: "#1e293b",
        padding: "18px",
        borderRadius: "12px",
        color: "#cbd5f5",
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        JustDefenders Command Centre
      </div>

      {/* SEARCH */}
      <div style={{
        background: "#e5e7eb",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px"
      }}>
        <input
          placeholder="Search parts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button onClick={search}>Search</button>
      </div>

      {/* RESULTS */}
      <div>

        {(data?.results || []).map((s: any, i: number) => (
          <div key={i} style={{
            background: "#e5e7eb",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "15px"
          }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: "bold" }}>{s.supplier}</div>
                <div>{s.partNumber}</div>
                <div style={{ fontWeight: "bold" }}></div>
              </div>

              {s.best && (
                <div style={{
                  background: "#16a34a",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "8px"
                }}>
                  BEST VALUE
                </div>
              )}
            </div>

            <div style={{ fontSize: "12px", marginTop: "5px" }}>
              Score: {s.score}
            </div>

            <div style={{ fontSize: "12px" }}>
              {s.insight}
            </div>

            <div style={{ fontSize: "12px" }}>
              {s.prediction}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
