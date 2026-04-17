/*
Timestamp: 8 March 2026 — 03:02
File: /app/components/AutonomousAgentPanel.tsx

Purpose:
Control interface for the Autonomous Reliability Agent.
*/

"use client"

import { useState } from "react"

export default function AutonomousAgentPanel(){

 const [result,setResult] = useState<number | null>(null)
 const [running,setRunning] = useState(false)

 async function run(){

  setRunning(true)

  const res = await fetch("/api/agent/reliability")

  const data = await res.json()

  setResult(data.actions)

  setRunning(false)

 }

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   Autonomous Reliability Agent

  </h2>

  <button
   onClick={run}
   className="bg-slate-800 px-4 py-2 rounded"
  >

   {running ? "Running Agent..." : "Run Reliability Agent"}

  </button>

  {result !== null && (

   <div className="mt-4 text-sm  text-neutral-400">

    {result} automated reliability actions generated

   </div>

  )}

 </div>

 )

}