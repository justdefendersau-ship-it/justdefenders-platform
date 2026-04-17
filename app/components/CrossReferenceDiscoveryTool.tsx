/*
Timestamp: 7 March 2026 — 23:01
File: /app/components/CrossReferenceDiscoveryTool.tsx

Purpose:
Admin tool to run automatic cross-reference discovery.
*/

"use client"

import { useState } from "react"

export default function CrossReferenceDiscoveryTool(){

 const [running,setRunning] = useState(false)
 const [result,setResult] = useState<number | null>(null)

 async function run(){

  setRunning(true)

  const res = await fetch("/api/parts/discover-cross-references")

  const data = await res.json()

  setResult(data.discovered)

  setRunning(false)

 }

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   Cross-Reference Discovery Engine

  </h2>

  <button
   onClick={run}
   className="bg-slate-800 px-4 py-2 rounded"
  >

   {running ? "Scanning Parts..." : "Run Discovery"}

  </button>

  {result !== null && (

   <div className="mt-4 text-sm  text-neutral-400">

    {result} cross-references discovered

   </div>

  )}

 </div>

 )

}