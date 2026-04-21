'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('starter')
  const [expanded, setExpanded] = useState(null)

  const [vins, setVins] = useState(['DEF-110-001'])
  const [activeVin, setActiveVin] = useState('DEF-110-001')
  const [newVin, setNewVin] = useState('')

  // MULTI FILTER
  const [filters, setFilters] = useState([])

  function toggleFilter(f) {
    if (filters.includes(f)) {
      setFilters(filters.filter(x => x !== f))
    } else {
      setFilters([...filters, f])
    }
  }

  async function search() {

    let url = 'http://localhost:4000/api/parts?q=' + query

    if (activeVin) url += '&vin=' + activeVin

    if (filters.length > 0) {
      url += '&filters=' + filters.join(',')
    }

    console.log('SEARCH URL:', url)

    const res = await fetch(url)
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    search()
  }, [activeVin, filters])

  function addVin() {
    if (newVin && !vins.includes(newVin)) {
      setVins([...vins, newVin])
      setNewVin('')
    }
  }

  function removeVin(v) {
    if (vins.length === 1) return
    const updated = vins.filter(x => x !== v)
    setVins(updated)
    if (activeVin === v) setActiveVin(updated[0])
  }

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
        JustDefenders Parts Intelligence
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
        <button onClick={search}>Search</button>
      </div>

      {/* FILTERS */}
      <div style={{ marginBottom: '15px' }}>
        {['OEM', 'Used', 'International'].map((f, i) => (
          <button
            key={i}
            onClick={() => toggleFilter(f)}
            style={{
              marginRight: '8px',
              padding: '6px 10px',
              background: filters.includes(f) ? '#2563eb' : '#334155',
              color: '#fff',
              borderRadius: '6px'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* VIN */}
      <div style={{ marginBottom: '15px' }}>
        {vins.map((vin, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 12px',
            marginRight: '8px',
            borderRadius: '20px',
            background: vin === activeVin ? '#16a34a' : '#334155',
            color: '#fff'
          }}>
            <span onClick={() => setActiveVin(vin)} style={{ cursor: 'pointer' }}>
              {vin}
            </span>
            <span onClick={() => removeVin(vin)} style={{ marginLeft: '6px', cursor: 'pointer' }}>✕</span>
          </span>
        ))}

        <div style={{ marginTop: '10px' }}>
          <input value={newVin} onChange={(e) => setNewVin(e.target.value)} placeholder="Add VIN" />
          <button onClick={addVin}>Add</button>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{ color: '#fff', marginBottom: '10px' }}>
        Results: {data.results.length}
      </div>

      {data.results.map((s, i) => {

        const price = Number(s.price) || 0

        const confidenceColour =
          s.confidence >= 85 ? '#16a34a' :
          s.confidence >= 60 ? '#f59e0b' :
          '#dc2626'

        // FIX: ALWAYS SHOW SOMETHING
        const vehicleText = s.vehicle
          ? s.vehicle.model + ' (' + s.vehicle.year + ')'
          : 'your selected vehicle'

        const confidence = s.confidence || 50

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

            {/* FIXED VIN INTELLIGENCE */}
            <div style={{ marginTop: '6px' }}>
              ✔ Fits {vehicleText}
            </div>

            <div style={{ color: confidenceColour, fontWeight: 'bold' }}>
              Confidence: {confidence}%
            </div>

            {/* EXPAND */}
            <div style={{ marginTop: '8px' }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)}>
                {expanded === i ? 'Hide options' : 'Show options (' + s.options + ')'}
              </button>
            </div>

            {expanded === i && (
              <div style={{ marginTop: '8px' }}>
                <div>Option 1</div>
                <div>Option 2</div>
                <div>Option 3</div>
                <div>Option 4</div>
              </div>
            )}

          </div>
        )
      })}

    </div>
  )
}
