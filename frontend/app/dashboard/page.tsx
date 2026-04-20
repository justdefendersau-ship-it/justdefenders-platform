'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {

  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('starter')
  const [activeFilter, setActiveFilter] = useState(null)

  const [vins, setVins] = useState(['DEF-110-001'])
  const [activeVin, setActiveVin] = useState('DEF-110-001')

  async function search(q = query, filter = activeFilter, vin = activeVin) {

    let url = 'http://localhost:4000/api/parts?q=' + q

    if (filter === 'Used') url += '&filter=used'
    if (filter === 'OEM') url += '&oem=true'
    if (vin) url += '&vin=' + vin

    const res = await fetch(url)
    const json = await res.json()
    setData(json)
  }

  // AUTO LOAD
  useEffect(() => {
    search('starter')
  }, [])

  // RE-RUN WHEN FILTER OR VIN CHANGES
  useEffect(() => {
    search(query, activeFilter, activeVin)
  }, [activeFilter, activeVin])

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', padding: '20px' }}>

      {/* HEADER */}
      <div style={{
        background: '#1e293b',
        padding: '18px',
        borderRadius: '12px',
        color: '#cbd5f5',
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        JustDefenders Command Centre
      </div>

      {/* SEARCH */}
      <div style={{
        background: '#e5e7eb',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '15px',
        maxWidth: '600px',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <button onClick={() => search()}>
          Search
        </button>
      </div>

      {/* VIN */}
      <div style={{ marginBottom: '15px' }}>
        {vins.map((vin, i) => (
          <span
            key={i}
            onClick={() => setActiveVin(vin)}
            style={{
              padding: '8px 12px',
              marginRight: '8px',
              borderRadius: '20px',
              cursor: 'pointer',
              background: vin === activeVin ? '#16a34a' : '#334155',
              color: '#fff'
            }}
          >
            {vin}
          </span>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        {['International', 'Used', 'OEM'].map((f, i) => (
          <button
            key={i}
            onClick={() => setActiveFilter(f)}
            style={{
              background: activeFilter === f ? '#2563eb' : '#1e293b',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* RESULTS */}
      <div>

        <div style={{ color: '#fff', marginBottom: '10px' }}>
          Results: {data.results.length}
        </div>

        {data.results.map((s, i) => {

          const price =
            s.price ??
            s.Price ??
            s.unit_price ??
            s.amount ??
            0

          const score = s.score ?? '-'

          return (
            <div key={i} style={{
              background: '#ffffff',
              color: '#000',
              padding: '16px',
              marginBottom: '12px',
              borderRadius: '12px'
            }}>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div>
                  <div style={{ fontWeight: 'bold' }}>{s.supplier}</div>
                  <div>{s.partNumber}</div>

                  <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
                    
                  </div>
                </div>

                {s.best && (
                  <div style={{
                    background: '#16a34a',
                    color: '#fff',
                    padding: '6px 10px',
                    borderRadius: '8px'
                  }}>
                    BEST VALUE
                  </div>
                )}

              </div>

              {/* SCORE + TOOLTIP */}
              <div style={{ marginTop: '6px', fontSize: '12px' }}>
                Score: {score}
                <span title="Score is based on price vs supplier reliability. Lower price + higher rating = better score." style={{ marginLeft: '6px', cursor: 'help' }}>
                  ❓
                </span>
              </div>

              <div style={{ fontSize: '12px' }}>
                {s.insight || ''}
              </div>

              <div style={{ fontSize: '12px' }}>
                {s.prediction || ''}
              </div>

              <a href={s.url} target='_blank'>
                <button style={{
                  marginTop: '10px',
                  background: '#2563eb',
                  color: '#fff',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}>
                  View Part
                </button>
              </a>

            </div>
          )
        })}

      </div>

    </div>
  )
}
