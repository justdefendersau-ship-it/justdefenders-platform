/*
Timestamp: 7 March 2026 — 23:29
File: /app/components/PartSearchBar.tsx

Purpose:
Global Defender part search with VIN-aware compatibility.
*/

"use client"

import { useState } from "react"
import VINCompatibilityPanel from "@/app/components/VINCompatibilityPanel"

interface Result{

 source:string
 part_number:string
 description:string

}

export default function PartSearchBar(){

 const [query,setQuery] = useState("")
 const [results,setResults] = useState<Result[]>([])
 const [vin,setVin] = useState("")

 async function search(q:string){

  setQuery(q)

  if(q.length < 2){
   setResults([])
   return
  }

  const res = await fetch(`/api/parts/search?q=${q}`)

  const data = await res.json()

  if(Array.isArray(data)){
   setResults(data)
  }

 }

 return(

 <div className="space-y-4">

  <input
   value={vin}
   onChange={(e)=>setVin(e.target.value)}
   placeholder="Enter VIN for compatibility"
   className="w-full bg-neutral-800 px-4 py-2 rounded"
  />

  <input
   value={query}
   onChange={(e)=>search(e.target.value)}
   placeholder="Search Defender parts…"
   className="w-full bg-neutral-800 px-4 py-2 rounded"
  />

  <div className="space-y-2">

   {results.map((r,i)=>(

    <div
     key={i}
     className="bg-slate-800 p-3 rounded"
    >

     <div className="text-sm font-semibold">

      {r.part_number}

     </div>

     <div className="text-xs  text-neutral-400">

      {r.description}

     </div>

    </div>

   ))}

  </div>

  {vin && (

   <VINCompatibilityPanel vin={vin} />

  )}

 </div>

 )

}