'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [data, setData] = useState({ results: [] })
  const [expanded, setExpanded] = useState(null)
const [query, setQuery] = useState('starter')
const [activeVin, setActiveVin] = useState('')
const [filter, setFilter] = useState('all')

  // =========================================================
  // LOAD DATA
  // =========================================================
  async function search() {
  try {
    const res = await fetch('http://localhost:4000/api/parts?q=' + encodeURIComponent(query))
    const json = await res.json()
    setData(json)
  } catch (err) {
    console.error('SEARCH ERROR:', err)
  }
}

useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:4000/api/parts?q=starter')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('LOAD ERROR:', err)
      }
    }

    load()
  }, [])

  return (
    <div style={{ padding: '20px', background: '#0b1a33', color: '#ffffff' }}>

      <h2 style={{
  color: '#9ca3af',
  fontSize: '28px',
  fontWeight: '700',
  marginBottom: '20px',
  letterSpacing: '0.5px'
}}>
  JustDefenders Parts Intelligence
</h2>

{/* SEARCH + VIN */}
<div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>

  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search parts..."
    style={{
      padding: '8px',
      border: '1px solid #555',
      borderRadius: '6px',
      width: '200px',
      color: '#111'
    }}
  />

  <button onClick={search} style={{
    background: '#2563eb',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px'
  }}>
    Search
  </button>

  <input
    value={activeVin}
    onChange={(e) => setActiveVin(e.target.value)}
    placeholder="Enter VIN"
    style={{
      padding: '8px',
      border: '1px solid #555',
      borderRadius: '6px',
      width: '180px',
      color: '#111'
    }}
  />

  <button style={{
    background: '#16a34a',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px'
  }}>
    + Add VIN
  </button>

</div>

{/* FILTERS */}
<div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>

  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search parts..."
    style={{
      padding: '8px',
      border: '1px solid #555',
      borderRadius: '6px',
      width: '200px',
      color: '#111'
    }}
  />

  <button onClick={search} style={{
    background: '#2563eb',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px'
  }}>
    Search
  </button>

  <input
    value={activeVin}
    onChange={(e) => setActiveVin(e.target.value)}
    placeholder="Enter VIN"
    style={{
      padding: '8px',
      border: '1px solid #555',
      borderRadius: '6px',
      width: '180px',
      color: '#111'
    }}
  />

  <button style={{
    background: '#16a34a',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px'
  }}>
    + Add VIN
  </button>

</div>

      {/* RESULTS */}
      {data.results.map((s, i) => (
        <div key={i} style={{
          background: '#ffffff', color: '#111',
          padding: '15px',
          marginTop: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{s.supplier}</div>
              <div>{s.partNumber}</div>
            </div>

            {s.best && (
              <div style={{ color: 'green', fontWeight: 'bold' }}>
                BEST VALUE
              </div>
            )}
          </div>

          {/* PRICE */}
          <div style={{
            fontSize: '26px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}>
            $ {s.price}
          </div>

          {/* INTELLIGENCE */}
          <div style={{
            fontSize: '13px',
            marginTop: '6px',
            color: '#555'
          }}>
            Trend: {s.trend} | Signal: {s.buySignal} | Confidence: {s.confidence}%
          </div>

          {/* OPTIONS */}
          <div
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              cursor: 'pointer',
              marginTop: '10px',
              color: 'blue'
            }}
          >
            {s.options} options available
          </div>

          {expanded === i && s.allOptions && (
            <div style={{ marginTop: '10px' }}>
              {s.allOptions.map((o, j) => (
                <div key={j}>
                  {o.supplier} — $ {o.price}
                </div>
              ))}
            </div>
          )}

        </div>
      ))}

    </div>
  )
}



