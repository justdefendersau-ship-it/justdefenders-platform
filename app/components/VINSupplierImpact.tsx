"use client"

/*
Timestamp: 8 March 2026 — 20:30
Supplier Impact Analysis
*/

import { useEffect,useState } from "react"

export default function VINSupplierImpact({vin}:{vin:string}){

 const [data,setData] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch(`/api/analytics/vin-suppliers/${vin}`)
   const json = await res.json()

   if(Array.isArray(json)){
    setData(json)
   }

  }

  load()

 },[vin])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Supplier Impact
   </h2>

   <div className="space-y-2">

    {data.map((s,i)=>(
     
     <div
      key={i}
      className="p-2 bg-slate-800 border border-slate-600 rounded"
     >
      {s.supplier} — Reliability Score {s.score}
     </div>

    ))}

   </div>

  </div>

 )
}