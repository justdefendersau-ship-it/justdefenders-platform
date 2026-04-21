'use client'
import { supabase } from '../../lib/supabase'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('starter')
const [vinInput, setVinInput] = useState('')
const [vins, setVins] = useState(['DEF-110-001'])
const [activeVin, setActiveVin] = useState('DEF-110-001')
  const [expanded, setExpanded] = useState(null)
const [filters, setFilters] = useState([])
const [watchlist, setWatchlist] = useState([])
const [alerts, setAlerts] = useState([])

  // ================================
  // SEARCH
  // ================================
  async function search() {
    let url = 'http://localhost:4000/api/parts?q=' + query + '&vin=' + activeVin

if (filters.length > 0) {
  url += '&filters=' + filters.join(',')
}

const res = await fetch(url)
    const json = await res.json()
    setData(json)
  }

  
  // ================================
  // WATCH FUNCTIONS
  // ================================
  async function loadWatchlist() {
    const { data } = await supabase.from('watchlist').select('*')
    setWatchlist(data || [])
  }

  function isWatching(item) {
  return watchlist.some(w =>
    w.part_number === item.partNumber &&
    w.supplier === item.supplier &&
    w.vin === activeVin
  )
}

  async function addWatch(item) {
    const { error } = await supabase
      .from('watchlist')
      .insert([{
        part_number: item.partNumber,
        supplier: item.supplier,
        vin: activeVin
      }])

    if (error) {
      alert('FAILED: ' + error.message)
      return
    }

    await loadWatchlist()
  }

  async function removeWatch(item) {
    await supabase
      .from('watchlist')
      .delete()
      .eq('part_number', item.partNumber)
      .eq('supplier', item.supplier)
.eq('vin', activeVin)

    await loadWatchlist()
  }
  
  // ================================
  // ALERTS
  // ================================
  async function loadAlerts() {
    const { data } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (!data) {
      setAlerts([])
      return
    }

    // Filter by watchlist
    const filtered = data.filter(a =>
      watchlist.some(w =>
        w.part_number === a.part_number &&
        w.supplier === a.supplier
      )
    )

    setAlerts(filtered)
  }
  
  // ================================
  // VIN MANAGEMENT
  // ================================
  function addVin() {
    if (!vinInput) return
    if (vins.includes(vinInput)) return

    setVins([...vins, vinInput])
    setActiveVin(vinInput)
    setVinInput('')
  }

  function removeVin(v) {
    const updated = vins.filter(x => x !== v)
    setVins(updated)

    if (activeVin === v && updated.length > 0) {
      setActiveVin(updated[0])
    }
  }
  useEffect(() => {
  search()
  loadWatchlist()
  loadAlerts()
}, [])

  // ================================
  // UI
  // ================================
  return (
    <div style={{ padding: '20px', background: '#0f172a', minHeight: '100vh' }}>

      <h1 style={{ color: '#9ca3af' }}>
        JustDefenders Parts Intelligence
      </h1>

      {/* SEARCH + VIN */}
      <div style={{ marginBottom: '20px' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
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

        {/* VIN INPUT */}
        <div style={{ marginTop: '10px' }}>
          <input
            value={vinInput}
            onChange={(e) => setVinInput(e.target.value)}
            placeholder='Enter VIN'
            style={{ padding: '6px', marginRight: '10px' }}
          />

          <button
            onClick={addVin}
            style={{
              background: '#16a34a',
              
            }}
          >
            + Add VIN
          </button>
        </div>

        {/* VIN CHIPS */}
        <div style={{ marginTop: '10px' }}>
          {vins.map(v => (
            <span
              key={v}
              onClick={() => setActiveVin(v)}
              style={{
                marginRight: '8px',
                padding: '5px 10px',
                borderRadius: '12px',
                cursor: 'pointer',
                background: v === activeVin ? '#16a34a' : '#d1fae5',
                color: v === activeVin ? '#fff' : '#065f46'
              }}
            >
              {v}
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  removeVin(v)
                }}
                style={{ marginLeft: '6px', color: 'red', cursor: 'pointer' }}
              >
                ×
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ marginBottom: '15px' }}>
        {['OEM', 'Used', 'International'].map(f => (
          <button
            key={f}
            onClick={() => {
              if (filters.includes(f)) {
                setFilters(filters.filter(x => x !== f))
              } else {
                setFilters([...filters, f])
              }
            }}
            style={{
              marginRight: '8px',
              padding: '6px 10px',
              background: filters.includes(f) ? '#2563eb' : '#d1fae5',
              color: filters.includes(f) ? '#fff' : '#000',
              borderRadius: '6px'
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {/* RESULTS */}
      {data.results.map((s, i) => (

        <div key={i} style={{
          background: '#fff',
          color: '#111',
          padding: '16px',
          marginBottom: '16px',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
        }}>

          <div style={{ fontWeight: 'bold' }}>
            {s.supplier}
          </div>

          <div>
            {s.partNumber}
          </div>

          {/* PRICE */}
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
            {'$' + (s.price || 0)}
          </div>

          {/* BEST */}
          {s.best && (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <div style={{ color: 'green', fontWeight: 'bold' }}>
      BEST VALUE
    </div>
  </div>
)}

          {/* EXPLANATION */}
          <div style={{ color: '#444' }}>
            {s.explanation}

          {/* PRICE SIGNAL */}
          <div style={{ marginTop: '8px', fontSize: '13px' }}>
            Trend: <strong>{s.trend}</strong> |
            Change: <strong>{s.change}%</strong>
          </div>

          <div style={{
            marginTop: '4px',
            fontWeight: 'bold',
            color: s.buySignal === 'Buy' ? 'green' :
                   s.buySignal === 'Wait' ? 'orange' : '#555'
          }}>
            {s.buySignal === 'Buy' ? '🔥 BUY NOW' :
             s.buySignal === 'Wait' ? '⏳ WAIT' : '➖ HOLD'}
          </div>
          </div>

          {/* VIN INTELLIGENCE */}
          <div style={{ marginTop: '6px', color: '#065f46', fontWeight: '500' }}>
  ✔ Fits {s.vehicle ? s.vehicle.model + ' (' + s.vehicle.year + ')' : 'Vehicle match (VIN-based)'}
</div>

          <div style={{ color: '#555', fontSize: '13px' }}>
            Confidence: {s.confidence || 0}%
          </div>

          {/* EXPAND BUTTON */}
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ marginTop: '10px' }}
          >
            {expanded === i ? 'Hide options' : 'Show options (' + s.options + ')'}
          </button>

          <div style={{ marginTop: '10px' }}>
            {isWatching(s) ? (
              <button onClick={() => removeWatch(s)}>❌ Unwatch</button>
            ) : (
              <button onClick={() => addWatch(s)}>⭐ Watch</button>
            )}
          </div>

          

          {/* OPTIONS */}
          {expanded === i && s.allOptions && (
            <div style={{ marginTop: '10px' }}>
              {s.allOptions.map((opt, idx) => (
                <div key={idx}>
                  {'$' + (opt.price || 0)} {idx === 0 ? '← Cheapest' : ''}
                </div>
              ))}
            </div>
          )}

        </div>
      ))}

    </div>
  )
}






























