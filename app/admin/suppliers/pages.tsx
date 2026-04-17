# ==================================================================================================
# File: C:\dev\justdefenders\app\admin\suppliers\page.tsx
# Timestamp: 13 April 2026 14:20
# Purpose: Admin dashboard to approve supplier nominations
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\app\admin\suppliers" | Out-Null

@'
"use client";

import { useEffect, useState } from "react";

export default function Page() {

  const [data, setData] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/admin/suppliers");
    const json = await res.json();
    setData(json);
  }

  async function approve(index: number) {
    await fetch("/api/admin/suppliers", {
      method: "POST",
      body: JSON.stringify({ index })
    });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Supplier Approvals</h1>

      {data.map((s, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>{s.name}</p>
          <p>{s.url}</p>
          <button onClick={() => approve(i)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\admin\suppliers\page.tsx" -Encoding UTF8