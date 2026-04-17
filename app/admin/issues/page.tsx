"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdminIssuesPage() {

  const [issues, setIssues] = useState<any[]>([])
  const [engine, setEngine] = useState("")
  const [name, setName] = useState("")
  const [km, setKm] = useState("")
  const [cost, setCost] = useState("")
  const [shape, setShape] = useState("2.5")

  async function load() {
    const { data } =
      await supabase
        .from("defender_known_issues")
        .select("*")
        .order("engine")

    setIssues(data || [])
  }

  useEffect(() => { load() }, [])

  async function addIssue() {
    await supabase
      .from("defender_known_issues")
      .insert({
        engine,
        issue_name: name,
        typical_km: Number(km),
        estimated_cost: Number(cost),
        weibull_shape: Number(shape)
      })

    setEngine("")
    setName("")
    setKm("")
    setCost("")
    load()
  }

  async function remove(id: string) {
    await supabase
      .from("defender_known_issues")
      .delete()
      .eq("id", id)

    load()
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Issue Admin</h1>

      <h3>Add Issue</h3>

      <input placeholder="Engine"
        value={engine}
        onChange={e => setEngine(e.target.value)} />

      <input placeholder="Issue"
        value={name}
        onChange={e => setName(e.target.value)} />

      <input placeholder="Typical KM"
        value={km}
        onChange={e => setKm(e.target.value)} />

      <input placeholder="Estimated Cost"
        value={cost}
        onChange={e => setCost(e.target.value)} />

      <input placeholder="Weibull Shape"
        value={shape}
        onChange={e => setShape(e.target.value)} />

      <button onClick={addIssue}>
        Add
      </button>

      <hr />

      {issues.map(issue => (
        <div key={issue.id}>
          {issue.engine} — {issue.issue_name}
          <button onClick={() => remove(issue.id)}>
            Delete
          </button>
        </div>
      ))}
    </main>
  )
}