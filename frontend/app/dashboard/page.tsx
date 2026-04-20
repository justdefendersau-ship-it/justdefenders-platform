'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('starter')
  const [expanded, setExpanded] = useState(null)

  const [vins, setVins] = useState(['DEF-110-001'])
  const [activeVin, setActiveVin] = useState('DEF-110-001')
  const [newVin, setNewVin] = useState('')

  async function search(q = query) {
    const res = await fetch('http://localhost:4000/api/parts?q=' + q)
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    search()
  }, [])

  function removeVin(vinToRemove) {

  // Prevent removing last VIN
  if (vins.length === 1) return

  const updated = vins.filter(v => v !== vinToRemove)
  setVins(updated)

  // If active VIN was removed → switch to first remaining
  if (activeVin === vinToRemove) {
    setActiveVin(updated[0])
  }
}

function addVin() {
    if (newVin && !vins.includes(newVin)) {
      setVins([...vins, newVin])
      setNewVin('')
    }
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
        <button
          onClick={() => search()}
          style={{ background: '#2563eb', color: '#fff', padding: '8px 14px', borderRadius: '6px' }}
        >
          Search
        </button>
      </div>

      {/* VIN SYSTEM */}
      <div style={{ marginBottom: '15px' }}>

        {vins.map((vin, i) => (
  <span
    key={i}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 12px',
      marginRight: '8px',
      borderRadius: '20px',
      background: vin === activeVin ? '#16a34a' : '#334155',
      color: '#fff'
    }}
  >

    <span
      onClick={() => setActiveVin(vin)}
      style={{ cursor: 'pointer', marginRight: '6px' }}
    >
      {vin}
    </span>

    <span
      onClick={() => removeVin(vin)}
      style={{
        cursor: 'pointer',
        fontWeight: 'bold',
        padding: '0 4px'
      }}
    >
      ✕
    </span>

  </span>
))}

        <div style={{ marginTop: '10px' }}>
          <input
            value={newVin}
            onChange={(e) => setNewVin(e.target.value)}
            placeholder='Add VIN'
            style={{ padding: '6px', marginRight: '8px' }}
          />
          <button onClick={addVin}>Add</button>
        </div>

      </div>

      {/* RESULTS */}
      <div style={{ color: '#fff', marginBottom: '10px' }}>
        Results: {data.results.length}
      </div>

      {data.results.map((s, i) => {

        const price = Number(s.price) || 0

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

                <div style={{
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>
                  
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


