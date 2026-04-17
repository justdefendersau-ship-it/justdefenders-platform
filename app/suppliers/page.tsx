# ==================================================================================================
# File: C:\dev\justdefenders\app\suppliers\page.tsx
# Timestamp: 13 April 2026 14:10
# Purpose: Supplier nomination UI
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\app\suppliers" | Out-Null

@'
"use client";

import { useState } from "react";

export default function Page() {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    await fetch("/api/nominate-supplier", {
      method: "POST",
      body: JSON.stringify({ name, url })
    });

    alert("Submitted for review");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Nominate Supplier</h1>

      <input placeholder="Supplier name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Website URL" onChange={(e)=>setUrl(e.target.value)} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\suppliers\page.tsx" -Encoding UTF8

Write-Host "✅ Supplier nomination UI created"