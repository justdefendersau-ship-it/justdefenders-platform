"use client"

/*
=====================================================
Supersession History Viewer
Timestamp: 26 Feb 2026 00:10
=====================================================
*/

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function SupersessionHistory() {

  const [partNumber, setPartNumber] = useState("")
  const [chain, setChain] = useState<any[]>([])

  async function loadChain() {

    let results: any[] = []
    let current = partNumber

    while (true) {

      const { data } = await supabase
        .from("jlr_master_parts")
        .select("*")
        .eq("supersedes_part_number", current)
        .single()

      if (!data) break

      results.push(data)
      current = data.part_number
    }

    setChain(results)
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Supersession History</h1>

      <input
        placeholder="Enter Part Number"
        value={partNumber}
        onChange={(e) => setPartNumber(e.target.value)}
      />

      <button onClick={loadChain}>View Chain</button>

      <div style={{ marginTop: 20 }}>
        {chain.map((item, index) => (
          <div key={index} style={{
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10
          }}>
            <strong>{item.part_number}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}