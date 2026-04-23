'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [data, setData] = useState({ results: [] })
  const [query, setQuery] = useState('starter')

  const [activeVin, setActiveVin] = useState('')
  const [vinList, setVinList] = useState([])
  const [filters, setFilters] = useState([])
const [expanded, setExpanded] = useState(null)

  useEffect(() => { search() }, [])

  async function search() {
    const res = await fetch('http://localhost:4000/api/parts?q=' + query)
    const json = await res.json()
    setData(json)
  }

  function toggleFilter(f) {
    setFilters(prev =>
      prev.includes(f)
        ? prev.filter(x => x !== f)
        : [...prev, f]
    )
  }

  const logos = {
    'LR Direct': '/logos/lrdirect.png',
    'Rovacraft': '/logos/rovacraft.png',
    'Burson': '/logos/burson.png',
    'Repco': '/logos/repco.png'
  }

  let results = data.results || []
  if (results.length > 0) results[0].recommended = true

  return (
    <div style={{
      background:'#0b1a33',
      minHeight:'100vh',
      padding:'20px',
      color:'#fff',
      maxWidth:'1100px',
      margin:'0 auto'
    }}>

      <h2 style={{
        color:'#9ca3af',
        fontWeight:'800',
        fontSize:'28px',
        textShadow:'0 2px 6px rgba(0,0,0,0.6)'
      }}>
        JustDefenders Parts Intelligence
      </h2>

      {/* SEARCH + VIN */}
      <div style={{ marginTop:'15px', display:'flex', gap:'10px' }}>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} style={{ padding:'8px', color:'#000' }} />
        <button onClick={search} style={{ padding:'8px', background:'#2563eb', color:'#fff' }}>Search</button>

        <input value={activeVin} onChange={(e)=>setActiveVin(e.target.value)} placeholder="Enter VIN" style={{ padding:'8px', color:'#000' }} />

        <button onClick={()=>{
          if(activeVin && !vinList.includes(activeVin)){
            setVinList([...vinList, activeVin])
            setActiveVin('')
          }
        }} style={{ padding:'8px', background:'#16a34a', color:'#fff' }}>
          + Add VIN
        </button>
      </div>

      {/* VIN */}
      <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
        {vinList.map((v,i)=>(
          <div key={i} style={{
            background:'#16a34a',
            padding:'6px 10px',
            borderRadius:'20px',
            display:'flex',
            gap:'6px'
          }}>
            {v}
            <span onClick={()=>setVinList(vinList.filter(x=>x!==v))} style={{ cursor:'pointer' }}>×</span>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display:'flex', gap:'10px', marginTop:'10px' }}>
        {['OEM','USED','INTERNATIONAL'].map(f=>{
          const active = filters.includes(f)
          return (
            <button key={f} onClick={()=>toggleFilter(f)} style={{
              background: active ? '#2563eb' : '#e5e7eb',
              color: active ? '#fff' : '#000',
              padding:'6px 10px',
              borderRadius:'6px'
            }}>
              {f}
            </button>
          )
        })}
      </div>

      {/* RESULTS */}
      {results.map((s,i)=>{

        const partNumber = 'NAD500210'
        const supplierLink =
  s.url && s.url !== '#'
    ? s.url
    : null
        const isOnline = s.supplier === 'LR Direct'

        return (

        <div key={i} style={{
          background:'#fff',
          color:'#000',
          marginTop:'15px',
          padding:'15px',
          borderRadius:'10px',
          display:'grid',
          gridTemplateColumns:'180px 0.9fr 180px 160px',
          gap:'8px',
          alignItems:'start'
        }}>

          {/* SUPPLIER */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <img src={logos[s.supplier]} style={{ width:'34px' }} />
              <strong>{s.supplier}</strong>
            </div>
          </div>

          {/* TEXT */}
          <div>
            <a
  href={supplierLink || '#'}
  onClick={(e) => {
    if (!supplierLink) {
      e.preventDefault()
    }
  }} target="_blank" style={{
              fontWeight:'700',
              color:'#2563eb',
              textDecoration:'underline'
            }}>
              {partNumber}

<div
  onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setExpanded(expanded === i ? null : i);
}}
  style={{
    cursor: 'pointer',
    color: '#2563eb',
    marginTop: '6px',
    fontSize: '12px'
  }}
>
  {s.options || 3} options available
</div>

{expanded === i && (
  <div style={{ marginTop: '6px', fontSize: '12px' }}>
    {(s.allOptions || []).map((o, j) => (
      <div key={j}>
        {o.url ? (
  <a href={o.url} target="_blank" style={{ color:'#2563eb' }}>
    {o.supplier} — $ {o.price}
  </a>
) : (
  <span>
    {o.supplier} — $ {o.price}
  </span>
)}
      </div>
    ))}
  </div>
)}
            </a>

            <div style={{ fontSize:'12px', color:'#555', marginTop:'4px' }}>
              Standard / OEM Variant
            </div>

            <div style={{ color:'#facc15', marginTop:'5px' }}>
              ★★★★☆
            </div>
          </div>

          {/* IMAGE (NOW IN GAP) */}
          <div style={{ display:'flex', alignItems:'center' }}>
            <div style={{
              width:'120px',
              height:'60px',
              background:'#eee',
              borderRadius:'6px'
            }} />
          </div>

          {/* PRICE / DECISION */}
          <div style={{ textAlign:'right', paddingRight:'10px' }}>

            <div style={{ fontSize:'24px', fontWeight:'800' }}>
              $ {s.price}
            </div>

            {i === 0 && (
              <div style={{ background:'#2563eb', color:'#fff', marginTop:'6px', padding:'4px' }}>
                RECOMMENDED
              </div>
            )}

            {!isOnline && (
              <>
                <div style={{ fontSize:'12px', marginTop:'8px' }}>📍 12 km</div>
                <div style={{ fontSize:'12px' }}>🚚 Pickup Today</div>
              </>
            )}

            {isOnline && (
              <div style={{ fontSize:'12px', color:'#2563eb', marginTop:'8px' }}>
                🌐 Online Only
              </div>
            )}

          </div>

        </div>

      )})}

    </div>
  )
}






