"use client"

/*
Timestamp: 8 March 2026 — 21:45
Autonomous Parts Procurement Agent Panel
*/

import { useEffect,useState } from "react"

export default function ProcurementAgentPanel(){

 const [items,setItems] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/procurement-agent")
   const json = await res.json()

   if(Array.isArray(json)){
    setItems(json)
   }

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Autonomous Parts Procurement
   </h2>

   <div className="space-y-3">

    {items.map((item,i)=>(
     
     <div
      key={i}
      className="p-3 bg-slate-800 border border-slate-600 rounded"
     >

      <div className="font-semibold">
       {item.part}
      </div>

      <div className="text-sm text-slate-300">
       Supplier: {item.supplier}
      </div>

      <div className="text-sm text-slate-300">
       Quantity: {item.quantity}
      </div>

      <div className="text-xs text-slate-400">
       {item.reason}
      </div>

      <div className="text-xs text-slate-400">
       Supplier Reliability: {item.reliabilityScore}
      </div>

     </div>

    ))}

   </div>

  </div>

 )
}