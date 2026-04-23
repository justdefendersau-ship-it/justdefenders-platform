'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const supplierLogos = {
    'LR Direct': '/logos/lrdirect.png',
    'Rovacraft': '/logos/rovacraft.png',
    'Burson': '/logos/burson.png',
    'Repco': '/logos/repco.png'
  }

  const [data, setData] = useState({ results: [] })
  const [expanded, setExpanded] = useState(null)

  const [query, setQuery] = useState('starter')

  const [activeVin, setActiveVin] = useState('')
  const [vinList, setVinList] = useState([])

  const [filters, setFilters] = useState([])

  // ----------------------------------------------------------
  // LOAD DATA
  // ----------------------------------------------------------
  useEffect(() => {
    search()
  }, [])

  async function search() {
    try {
      const res = await fetch('http://localhost:4000/api/parts?q=' + query)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    }
  }

  function toggleFilter(f) {
    setFilters(prev =>
      prev.includes(f)
        ? prev.filter(x => x !== f)
        : [...prev, f]
    )
  }

  
  // ----------------------------------------------------------
  // ALERTS ENGINE (simple logic)
  // ----------------------------------------------------------
  const alerts = (data.results || []).map(r => {
    if (r.trend === 'falling') {
      return { text: r.partNumber + ' → 🔥 Price dropping', type: 'good' }
    }
    if (r.trend === 'rising') {
      return { text: r.partNumber + ' → ⚠️ Price rising', type: 'warn' }
    }
    return null
  }).filter(Boolean)

  
  // ----------------------------------------------------------
  // RECOMMENDATION ENGINE
  // ----------------------------------------------------------
  let scoredResults = (data.results || []).map(r => {

    let score = 0

    // Lower price = better
    score -= r.price || 0

    // Higher confidence = better
    score += (r.confidence || 50) * 2

    // Trend bonus
    if (r.trend === 'falling') score += 20
    if (r.trend === 'rising') score -= 10

    return {
      ...r,
      score
    }
  })

  // Sort by score (highest first)
  scoredResults.sort((a, b) => b.score - a.score)

  // Mark best overall
  if (scoredResults.length > 0) {
    scoredResults[0].recommended = true
  }

  
  // ----------------------------------------------------------
  // FINAL POLISH DATA LAYER
  // ----------------------------------------------------------
  const enrich = (supplier) => {
    return {
      distance: Math.floor(Math.random() * 25) + ' km',
      delivery: ['Pickup Today','Next Day','2-3 Days'][Math.floor(Math.random()*3)],
      online: supplier === 'LR Direct' // example rule
    }
  }

  
  // ----------------------------------------------------------
  // PART INTELLIGENCE
  // ----------------------------------------------------------
  const getPartInfo = (partNumber) => {

    if (!partNumber) return { base: '', quality: '', desc: '' }

    if (partNumber.endsWith('G')) {
      return {
        base: partNumber,
        quality: 'High Quality (OEM)',
        desc: 'Hella/Bosch OEM specification'
      }
    }

    if (partNumber.endsWith('H')) {
      return {
        base: partNumber,
        quality: 'High Quality (Updated)',
        desc: 'Latest revision / improved design'
      }
    }

    return {
      base: partNumber,
      quality: 'Standard',
      desc: 'Aftermarket / base specification'
    }
  }

  return (
    <div style={{ padding: '20px', background: '#0b1a33', minHeight: '100vh', color: '#fff' }}>

      <h2 style={{
        color: '#9ca3af',
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '20px'
      }}>
        JustDefenders Parts Intelligence
      </h2>

      {/* SEARCH + VIN */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', width: '200px', color: '#000' }}
        />

        <button onClick={search} style={{
          background: '#2563eb',
          color: '#fff',
          padding: '8px'
        }}>
          Search
        </button>

        <input
          value={activeVin}
          onChange={(e) => setActiveVin(e.target.value)}
          placeholder="Enter VIN"
          style={{ padding: '8px', width: '180px', color: '#000' }}
        />

        <button
          onClick={() => {
            if (!activeVin) return
            if (!vinList.includes(activeVin)) {
              setVinList([...vinList, activeVin])
              setActiveVin('')
            }
          }}
          style={{ background: '#16a34a', color: '#fff', padding: '8px' }}
        >
          + Add VIN
        </button>

      </div>

      {/* VIN CHIPS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        {vinList.map((vin, i) => (
          <div key={i} style={{
            background: activeVin === vin ? '#14532d' : '#16a34a',
            padding: '6px 10px',
            borderRadius: '20px',
            cursor: 'pointer'
          }}>
            <span onClick={() => setActiveVin(vin)}>{vin}</span>
            <span
              onClick={() => setVinList(vinList.filter(v => v !== vin))}
              style={{ marginLeft: '6px' }}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
        flexWrap: 'nowrap'
      }}>
        {['OEM','USED','INTERNATIONAL'].map(f => {
          const active = filters.includes(f)
          
  // ----------------------------------------------------------
  // ALERTS ENGINE (simple logic)
  // ----------------------------------------------------------
  const alerts = (data.results || []).map(r => {
    if (r.trend === 'falling') {
      return { text: r.partNumber + ' → 🔥 Price dropping', type: 'good' }
    }
    if (r.trend === 'rising') {
      return { text: r.partNumber + ' → ⚠️ Price rising', type: 'warn' }
    }
    return null
  }).filter(Boolean)

  
  // ----------------------------------------------------------
  // RECOMMENDATION ENGINE
  // ----------------------------------------------------------
  let scoredResults = (data.results || []).map(r => {

    let score = 0

    // Lower price = better
    score -= r.price || 0

    // Higher confidence = better
    score += (r.confidence || 50) * 2

    // Trend bonus
    if (r.trend === 'falling') score += 20
    if (r.trend === 'rising') score -= 10

    return {
      ...r,
      score
    }
  })

  // Sort by score (highest first)
  scoredResults.sort((a, b) => b.score - a.score)

  // Mark best overall
  if (scoredResults.length > 0) {
    scoredResults[0].recommended = true
  }

  
  // ----------------------------------------------------------
  // FINAL POLISH DATA LAYER
  // ----------------------------------------------------------
  const enrich = (supplier) => {
    return {
      distance: Math.floor(Math.random() * 25) + ' km',
      delivery: ['Pickup Today','Next Day','2-3 Days'][Math.floor(Math.random()*3)],
      online: supplier === 'LR Direct' // example rule
    }
  }

  
  // ----------------------------------------------------------
  // PART INTELLIGENCE
  // ----------------------------------------------------------
  const getPartInfo = (partNumber) => {

    if (!partNumber) return { base: '', quality: '', desc: '' }

    if (partNumber.endsWith('G')) {
      return {
        base: partNumber,
        quality: 'High Quality (OEM)',
        desc: 'Hella/Bosch OEM specification'
      }
    }

    if (partNumber.endsWith('H')) {
      return {
        base: partNumber,
        quality: 'High Quality (Updated)',
        desc: 'Latest revision / improved design'
      }
    }

    return {
      base: partNumber,
      quality: 'Standard',
      desc: 'Aftermarket / base specification'
    }
  }

  return (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              style={{
                background: active ? '#2563eb' : '#e5e7eb',
                color: active ? '#fff' : '#000',
                padding: '6px 10px',
                borderRadius: '6px'
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* ALERTS */}
<div style={{
  background: '#111827',
  padding: '12px',
  borderRadius: '8px',
transition: 'all 0.2s ease',
cursor: 'pointer',
  marginBottom: '15px'
}}>
  <div style={{ fontWeight: '700', marginBottom: '6px' }}>Alerts</div>

  {alerts.length === 0 && <div style={{ color: '#aaa' }}>No alerts</div>}

  {alerts.map((a, i) => (
    <div key={i} style={{
      color: a.type === 'good' ? '#16a34a' : '#f59e0b',
      fontSize: '14px'
    }}>
      {a.text}
    </div>
  ))}
</div>

{/* RESULTS */}
      {scoredResults.map((s, i) => (

        <div key={i} style={{
          background: s.recommended ? '#eff6ff' : '#fff',
border: s.recommended ? '2px solid #2563eb' : 'none',
          color: '#000',
          padding: '15px',
          marginBottom: '15px',
          borderRadius: '8px',
transition: 'all 0.2s ease',
cursor: 'pointer'
        }}>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <img src={supplierLogos[s.supplier]} style={{ width: '24px', height: '24px' }} />
  <strong>{s.supplier}</strong>
</div>
            {s.best && <div style={{ fontWeight: '700', color: '#16a34a' }}>💰 BEST VALUE</div>}

{s.recommended && (
  <div style={{
    marginTop: '6px',
    fontSize: '12px',
    color: '#1d4ed8'
  }}>
    Recommended based on price, confidence and trend
  </div>
)}

{s.recommended && (
  <div style={{
    marginTop: '4px',
    background: '#2563eb',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px'
  }}>
    RECOMMENDED
  </div>
)}
          </div>

          <div>{s.partNumber}

{(() => {
  const info = getPartInfo(s.partNumber)
  return (
    <div style={{ fontSize: '12px', marginTop: '6px', color: '#555' }}>

      <div>
        <strong>{info.base}</strong>
      </div>

      <div>
        {info.quality}
        <span title={info.desc} style={{ marginLeft: '6px', cursor: 'help' }}>
          ℹ️
        </span>
      </div>

      <div style={{ color: '#facc15', marginTop: '4px' }}>
        {'★'.repeat(s.rating || 4)}{'☆'.repeat(5 - (s.rating || 4))}
      </div>

    </div>
  )
})()}

{(() => {
  const meta = enrich(s.supplier)
  
  // ----------------------------------------------------------
  // PART INTELLIGENCE
  // ----------------------------------------------------------
  const getPartInfo = (partNumber) => {

    if (!partNumber) return { base: '', quality: '', desc: '' }

    if (partNumber.endsWith('G')) {
      return {
        base: partNumber,
        quality: 'High Quality (OEM)',
        desc: 'Hella/Bosch OEM specification'
      }
    }

    if (partNumber.endsWith('H')) {
      return {
        base: partNumber,
        quality: 'High Quality (Updated)',
        desc: 'Latest revision / improved design'
      }
    }

    return {
      base: partNumber,
      quality: 'Standard',
      desc: 'Aftermarket / base specification'
    }
  }

  return (
    <div style={{
      marginTop: '6px',
      fontSize: '12px',
      color: '#555'
    }}>
      <div>📍 {meta.distance}</div>
      <div>🚚 {meta.delivery}</div>
      {meta.online && <div style={{ color: '#2563eb' }}>🌐 Online Only</div>}
    </div>
  )
})()}</div>

          <div style={{ fontSize: '24px', fontWeight: '700' }}>
            $ {s.price}
          </div>

          <div
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ cursor: 'pointer', color: '#2563eb', marginTop: '10px' }}
          >
            {s.options} options available
          </div>

          {expanded === i && (
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







