'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [query, setQuery] = useState('starter')
  const [data, setData] = useState<any>({ results: [] })

  async function search() {
    try {
      const res = await fetch('http://localhost:4000/api/parts?q=' + query)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.log('Fetch error:', err)
    }
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <div style={{ padding: "24px", background: "#111827", minHeight: "100vh", color: "#fff" }}>

      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#d1d5db" }}>
          Parts Intelligence
        </h1>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search parts..."
          style={{
            padding: "10px",
            borderRadius: "8px",
            width: "300px",
            marginRight: "10px"
          }}
        />
        <button
          onClick={search}
          style={{
            background: "#2563eb",
            padding: "10px 16px",
            borderRadius: "8px",
            color: "#fff"
          }}
        >
          Search
        </button>
      </div>

      {/* RESULTS */}
      <div>

        {(data.results || []).map((s: any, i: number) => (

          <div key={i}
            style={{
              background: "#1f2937",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}>

            {/* BEST OPTION */}
            {s.best && (
              <div style={{
                background: "#16a34a",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                display: "inline-block",
                marginBottom: "6px"
              }}>
                BEST OPTION
              </div>
            )}

            {/* SUPPLIER */}
            <div style={{ fontWeight: 700 }}>
              {s.supplier}
            </div>

            {/* PART */}
            <div style={{ color: "#9ca3af" }}>
              {s.partNumber}
            </div>

            {/* PRICE */}
            <div style={{ fontSize: "22px", fontWeight: 800 }}>
              
            </div>

            {/* SCORE */}
            <div style={{ fontSize: "12px", marginTop: "4px" }}>
              Score: {s.score}
            </div>

            {/* INSIGHT */}
            <div style={{ fontSize: "12px", marginTop: "4px", color: "#9ca3af" }}>
              {s.priceInsight}
            </div>

            {/* PREDICTION */}
            <div style={{ fontSize: "12px", marginTop: "4px", color: "#9ca3af" }}>
              {s.prediction}
            </div>

            {/* BUTTON */}
            <div style={{ marginTop: "10px" }}>
              <a href={s.url} target="_blank">
                <button style={{
                  background: "#2563eb",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  color: "#fff"
                }}>
                  View Part
                </button>
              </a>
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
