"use client"

/*
Timestamp: 9 March 2026 — 01:05
My Shed Smart Inventory Panel
*/

import { useEffect,useState } from "react"

export default function MyShedInventoryPanel(){

 const [inventory,setInventory] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/parts/inventory")
   const json = await res.json()

   if(Array.isArray(json)){
    setInventory(json)
   }

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    My Shed Inventory Intelligence
   </h2>

   <div className="space-y-3">

    {inventory.map((item,i)=>{

     const alertColor =
      item.stock <= item.reorderLevel
       ? "text-red-400"
       : "text-green-400"

     return(

      <div
       key={i}
       className="p-3 bg-slate-800 border border-slate-600 rounded"
      >

       <div className="font-semibold">
        {item.part}
       </div>

       <div className="text-sm text-slate-300">
        Stock Level: {item.stock}
       </div>

       <div className={`text-xs ${alertColor}`}>
        Reorder Level: {item.reorderLevel}
       </div>

      </div>

     )

    })}

   </div>

  </div>

 )
}