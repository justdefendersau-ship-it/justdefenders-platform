'use client'

import { useState } from 'react'

export default function VinManager({ activeVin, setActiveVin }) {
  const [inputVin, setInputVin] = useState('')
  const [vinList, setVinList] = useState([])

  function addVin() {
    if (!inputVin) return
    if (vinList.includes(inputVin)) return

    setVinList([...vinList, inputVin])
    setActiveVin(inputVin)
    setInputVin('')
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      
      <input
        value={inputVin}
        onChange={(e) => setInputVin(e.target.value)}
        placeholder="Enter VIN"
        style={{ padding: '8px', marginRight: '10px', width: '260px' }}
      />

      <button
        onClick={addVin}
        style={{
          background: '#16a34a',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '6px'
        }}
      >
        + Add VIN
      </button>

      <div style={{ marginTop: '10px' }}>
        {vinList.map((v, i) => (
          <span
            key={i}
            onClick={() => setActiveVin(v)}
            style={{
              display: 'inline-block',
              background: activeVin === v ? '#16a34a' : '#e5e7eb',
              color: activeVin === v ? '#fff' : '#333',
              padding: '4px 10px',
              borderRadius: '20px',
              marginRight: '6px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {v}
          </span>
        ))}
      </div>

    </div>
  )
}
