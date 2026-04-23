'use client'

import { useState, useEffect } from 'react'
import VinManager from '../components/VinManager'

export default function Dashboard() {

  const [query, setQuery] = useState('starter')
  const [data, setData] = useState({ results: [] })
  const [expanded, setExpanded] = useState(null)
  const [filters, setFilters] = useState([])
  const [activeVin, setActiveVin] = useState('')

  async function search() {
    try {
      let url = 'http://localhost:4000/api/parts?q=' + encodeURIComponent(query)

      if (filters.length > 0) {
        url += '&filters=' + encodeURIComponent(filters.join(','))
      }

      if (activeVin && activeVin.length > 5) {
        url += '&vin=' + encodeURIComponent(activeVin)
      }

      const res = await fetch(url)
      const json = await res.json()

      if (json && json.results) {
        setData(json)
      } else {
        setData({ results: [] })
      }

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    search()
  }, [])

  function toggleFilter(f) {
    if (filters.includes(f)) {
      setFilters(filters.filter(x => x !== f))
    } else {
      setFilters([...filters, f])
    }
  }

  return (
    <div style={{ padding: '20px' }}>

      <h2 style={{ color: '#555', fontSize: '22px', marginBottom: '20px' }}>
        JustDefenders Parts Intelligence
      </h2>

      {/* SEARCH */}
      <div style={{ marginBottom: '20px' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />

        <button
          onClick={search}
          style={{
            background: '#2563eb',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px'
          }}
        >
          Search
        </button>
      </div>

      {/* VIN */}
      <VinManager activeVin={activeVin} setActiveVin={setActiveVin} />

      {/* FILTERS */}
      <div style={{ marginBottom: '15px' }}>
        {['OEM', 'Used', 'International'].map(f => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            style={{
              marginRight: '8px',
              padding: '6px 10px',
              borderRadius: '6px',
              background: filters.includes(f) ? '#2563eb' : '#e5e7eb',
              color: filters.includes(f) ? '#fff' : '#333'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* RESULTS */}
      {data.results.map((s, i) => (
        <div key={i} style={{
          background: '#ffffff',
          padding: '15px',
          marginBottom: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          color: '#000'
        }}>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {s.supplier}
              </div>
              <div style={{ color: '#222' }}>
                {s.partNumber}
              </div>
            </div>

            <div style={{ color: '#16a34a', fontWeight: 'bold' }}>
              BEST VALUE
            </div>
          </div>

          <div style={{
            fontSize: '26px',
            fontWeight: 'bold',
            marginTop: '10px',
            color: '#000'
          }}>
            {'$' + s.price}
          </div>

          <div
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              cursor: 'pointer',
              marginTop: '10px',
              color: '#2563eb',
              fontWeight: '500'
            }}
          >
            {s.options} options available
          </div>

          {expanded === i && s.allOptions && (
            <div style={{ marginTop: '10px' }}>
              {s.allOptions.map((o, j) => (
                <div key={j} style={{
                  fontSize: '14px',
                  color: '#111',
                  padding: '4px 0'
                }}>
                  {o.supplier} — {'$' + o.price}
                </div>
              ))}
            </div>
          )}

        </div>
      ))}

    </div>
  )
}
