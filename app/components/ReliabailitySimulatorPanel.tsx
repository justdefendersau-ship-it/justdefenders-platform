"use client"

/*
Timestamp: 8 March 2026 — 23:05
Reliability Intelligence Command Simulator Panel
*/

import { useState } from "react"

export default function ReliabilitySimulatorPanel(){

 const [scenario,setScenario] = useState("")
 const [result,setResult] = useState("")

 async function simulate(){

  const res = await fetch("/api/analytics/reliability-simulator",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    scenario
   })

  })

  const data = await res.json()

  setResult(data.result)

 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Reliability Command Simulator
   </h2>

   <select
    value={scenario}
    onChange={(e)=>setScenario(e.target.value)}
    className="p-2 bg-slate-800 border border-slate-600 rounded mb-3 w-full"
   >

    <option value="">Select simulation scenario</option>

    <option value="turbo-delay">
     Delay turbo replacement
    </option>

    <option value="supplier-change">
     Change supplier
    </option>

    <option value="maintenance-delay">
     Delay scheduled maintenance
    </option>

   </select>

   <button
    onClick={simulate}
    className="px-4 py-2 bg-blue-600 rounded"
   >
    Run Simulation
   </button>

   {result && (

    <div className="mt-4 text-slate-300">
     {result}
    </div>

   )}

  </div>

 )
}