'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [data, setData] = useState({ results: [] })

  async function load() {
    try {
      const res = await fetch('http://localhost:4000/api/parts?q=starter')
      const json = await res.json()
      console.log('API DATA:', json)
      setData(json)
    } catch (e) {
      console.error('FETCH ERROR:', e)
      setData({ results: [] })
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div style={{ padding: '20px' }}>

      <h1 style={{ color: 'red' }}>TEST BUILD 123</h1>

      <h2>JustDefenders Command Centre</h2>

      <div style={{ marginBottom: '10px' }}>
        Results: {data.results.length}
      </div>

      {data.results.map((s, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px'
          }}
        >
          <div><strong>{s.supplier}</strong></div>
          <div>{s.partNumber}</div>

          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            PRICE: {s.price}
          </div>

          <div style={{ fontSize: '12px' }}>
            {s.options ? s.options + ' options available' : ''}
          </div>

          {s.best && (
            <div style={{ color: 'green', fontWeight: 'bold' }}>
              BEST VALUE
            </div>
          )}
        </div>
      ))}

    </div>
  )
}
