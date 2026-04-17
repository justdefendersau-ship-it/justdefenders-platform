# ==================================================================================================
# File: C:\dev\justdefenders\app\parts\page.tsx
# Timestamp: 13 April 2026 14:20
# Purpose: Add VIN + model/year toggle
# JustDefenders ©
# ==================================================================================================

@'
"use client";

import { useState } from "react";

export default function Page() {

  const [part, setPart] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("Defender");
  const [year, setYear] = useState(2000);
  const [useVIN, setUseVIN] = useState(true);

  const [data, setData] = useState<any[]>([]);

  async function search() {

    const query = useVIN
      ? `/api/parts?part=${part}&vin=${vin}`
      : `/api/parts?part=${part}&model=${model}&year=${year}`;

    const res = await fetch(query);
    const json = await res.json();
    setData(json);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Parts Intelligence</h1>

      <input placeholder="Part Number" onChange={(e)=>setPart(e.target.value)} />

      <label>
        <input type="checkbox" checked={useVIN} onChange={()=>setUseVIN(!useVIN)} />
        Use VIN
      </label>

      {useVIN ? (
        <input placeholder="VIN" onChange={(e)=>setVin(e.target.value)} />
      ) : (
        <>
          <input placeholder="Model" onChange={(e)=>setModel(e.target.value)} />
          <input placeholder="Year" onChange={(e)=>setYear(Number(e.target.value))} />
        </>
      )}

      <button onClick={search}>Search</button>

      {data.map((d,i)=>(
        <div key={i}>
          <h3>{d.supplier} {d.best && "🔥"}</h3>
          <p>{d.totalAUD}</p>
        </div>
      ))}
    </div>
  );
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\parts\page.tsx" -Encoding UTF8