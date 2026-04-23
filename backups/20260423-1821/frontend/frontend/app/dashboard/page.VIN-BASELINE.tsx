'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  function toggleFilter(f) {
    setFilters(prev => prev.includes(f)
      ? prev.filter(x => x !== f)
      : [...prev, f]
    )
  }

  const [data, setData] = useState({ results: [] })
  const [expanded, setExpanded] = useState(null)
const [query, setQuery] = useState('starter')
const [activeVin, setActiveVin] = useState('')
const [vinList, setVinList] = useState([])
const [filters, setFilters] = useState([])

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
  textShadow: '0 2px 4px rgba(0,0,0,0.4)'
}}>
  JustDefenders Parts Intelligence
</h2>

<div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>

  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={{ padding: '8px', borderRadius: '6px', width: '200px', color: '#000' }}
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
    style={{ padding: '8px', borderRadius: '6px', width: '180px', color: '#000' }}
  />

  <button
    onClick={() => {
      if (!activeVin) return
      if (!vinList.includes(activeVin)) {
        setVinList([...vinList, activeVin]); setActiveVin('')
      }
    }}
    style={{
      background: '#16a34a',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '6px'
    }}
  >
    + Add VIN
  </button>

</div>

{/* VIN CHIPS */}
<div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
  {vinList.map((vin, i) => (
  <div
    key={i}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: activeVin === vin ? '#14532d' : '#16a34a',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '20px',
      fontSize: '12px'
    }}
  >

    <span
      onClick={() => setActiveVin(vin)}
      style={{ cursor: 'pointer' }}
    >
      {vin}
    </span>

    <span
      onClick={() => {
        const updated = vinList.filter(v => v !== vin)
        setVinList(updated)
        if (activeVin === vin) setActiveVin('')
      }}
      style={{
        cursor: 'pointer',
        fontWeight: 'bold',
        paddingLeft: '4px'
      }}
    >
      ×
    </span>

  </div>
))}
</div>

{/* FILTERS */}
<div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
  {['OEM','USED','INTERNATIONAL'].map(f => {
    const isActive = filters.includes(f)
    return (
      <button
        key={f}
        onClick={() => toggleFilter(f)}
        style={{
          background: isActive ? '#2563eb' : '#e5e7eb',
          color: isActive ? '#fff' : '#000',
          padding: '6px 10px',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: isActive ? '0 2px 6px rgba(37,99,235,0.6)' : 'none'
        }}
      >
        {f}
      </button>
    )
  })}
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











