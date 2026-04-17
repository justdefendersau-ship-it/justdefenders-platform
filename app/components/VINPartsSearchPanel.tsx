"use client"

/*
Timestamp: 8 March 2026 — 23:55
VIN-Aware Parts Search Panel
*/

import { useState } from "react"

export default function VINPartsSearchPanel(){

 const [vin,setVin] = useState("")
 const [results,setResults] = useState<any[]>([])

 async function search(){

  const res = await fetch("/api/parts/vin-search",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    vin
   })

  })

  const data = await res.json()

  if(Array.isArray(data.parts)){
   setResults(data.parts)
  }

 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    VIN-Aware Parts Search
   </h2>

   <input
    value={vin}
    onChange={(e)=>setVin(e.target.value)}
    placeholder="Enter VIN"
    className="w-full p-2 mb-3 bg-slate-800 border border-slate-600 rounded"
   />

   <button
    onClick={search}
    className="px-4 py-2 bg-blue-600 rounded"
   >
    Search Parts
   </button>

   <div className="mt-4 space-y-3">

    {results.map((p,i)=>(
     
     <div
      key={i}
      className="p-3 bg-slate-800 border border-slate-600 rounded"
     >

      <div className="font-semibold">
       {p.part}
      </div>

      <div className="text-sm text-slate-300">
       OEM: {p.oem}
      </div>

      <div className="text-sm text-slate-300">
       Supplier: {p.supplier}
      </div>

      <div className="text-xs text-slate-400">
       Reliability Score: {p.reliabilityScore}
      </div>

     </div>

    ))}

   </div>

  </div>

 )
}