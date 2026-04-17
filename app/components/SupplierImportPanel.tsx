/*
Timestamp: 8 March 2026 — 04:14
File: /app/components/SupplierImportPanel.tsx

Purpose:
Upload CSV supplier list and import into database.
*/

"use client"

import { useState } from "react"

export default function SupplierImportPanel(){

 const [csv,setCSV] = useState("")
 const [result,setResult] = useState<number | null>(null)

 async function run(){

  const res = await fetch("/api/suppliers/import",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    csv
   })

  })

  const data = await res.json()

  setResult(data.imported)

 }

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   Supplier CSV Import

  </h2>

  <textarea
   value={csv}
   onChange={(e)=>setCSV(e.target.value)}
   placeholder="Paste CSV supplier list here..."
   className="w-full h-40 bg-neutral-800 p-3 rounded"
  />

  <button
   onClick={run}
   className="mt-4 bg-neutral-800 px-4 py-2 rounded"
  >

   Import Suppliers

  </button>

  {result !== null && (

   <div className="mt-4 text-sm  text-neutral-400">

    {result} suppliers imported

   </div>

  )}

 </div>

 )

}