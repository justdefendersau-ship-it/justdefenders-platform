/*
Timestamp: 7 March 2026 — 22:34
File: /app/components/PartCrossReferencePanel.tsx

Purpose:
Display cross-referenced Defender parts.
*/

"use client"

import { useEffect,useState } from "react"

interface CrossPart{

 cross_part_number:string
 brand:string
 description:string

}

export default function PartCrossReferencePanel({ part }:{ part:string }){

 const [parts,setParts] = useState<CrossPart[]>([])

 useEffect(()=>{

  if(!part) return

  async function load(){

   const res = await fetch(`/api/parts/cross-reference?part=${part}`)
   const data = await res.json()

   if(Array.isArray(data)){
    setParts(data)
   }

  }

  load()

 },[part])

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   Compatible Parts

  </h2>

  <div className="space-y-3">

   {parts.map((p,i)=>(

    <div
     key={i}
     className="bg-slate-800 p-4 rounded"
    >

     <div className="font-semibold text-sm">

      {p.cross_part_number}

     </div>

     <div className="text-xs  text-neutral-400">

      {p.brand}

     </div>

     <div className="text-xs  text-neutral-500">

      {p.description}

     </div>

    </div>

   ))}

   {parts.length === 0 && (

    <div className="text-sm  text-neutral-400">

     No cross-reference parts found

    </div>

   )}

  </div>

 </div>

 )

}