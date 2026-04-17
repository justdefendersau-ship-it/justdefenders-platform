/*
Timestamp: 7 March 2026 — 23:26
File: /app/components/VINCompatibilityPanel.tsx

Purpose:
Display compatible parts for a given VIN.
*/

"use client"

import { useEffect,useState } from "react"

interface Part{

 part_number:string
 component:string

}

export default function VINCompatibilityPanel({ vin }:{ vin:string }){

 const [parts,setParts] = useState<Part[]>([])

 useEffect(()=>{

  if(!vin) return

  async function load(){

   const res = await fetch(`/api/parts/vin-compatibility?vin=${vin}`)

   const data = await res.json()

   if(Array.isArray(data)){
    setParts(data)
   }

  }

  load()

 },[vin])

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   VIN Compatible Parts

  </h2>

  <div className="space-y-3">

   {parts.map((p,i)=>(

    <div
     key={i}
     className="bg-slate-800 p-4 rounded"
    >

     <div className="text-sm font-semibold">

      {p.part_number}

     </div>

     <div className="text-xs  text-neutral-400">

      {p.component}

     </div>

    </div>

   ))}

   {parts.length === 0 && (

    <div className="text-sm  text-neutral-400">

     No compatible parts found

    </div>

   )}

  </div>

 </div>

 )

}