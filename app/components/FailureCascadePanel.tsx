/*
Timestamp: 8 March 2026 — 22:00
File: /app/components/FailureCascadePanel.tsx

Purpose:
Display predicted component failure cascades
for vehicles at risk.

Fix:
Ensure API response is always treated safely
to avoid runtime errors when non-array data
is returned.
*/

"use client"

import { useEffect, useState } from "react"

interface Cascade {
 vin: string
 root_component: string
 cascade_chain: string[]
 total_risk: number
}

export default function FailureCascadePanel(){

 const [cascades,setCascades] = useState<Cascade[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/failure-cascades")
    const data = await res.json()

    if(Array.isArray(data)){
     setCascades(data)
    } else {
     console.error("Invalid cascade response:",data)
     setCascades([])
    }

   }catch(err){

    console.error("Cascade fetch error:",err)
    setCascades([])

   }finally{

    setLoading(false)

   }

  }

  load()

 },[])

 return(

 <div className="bg-slate-900 rounded-xl p-6 border border-neutral-800">

  <h2 className="text-xl font-semibold mb-4">
   Failure Cascade Predictions
  </h2>

  <div className="space-y-4">

   {loading && (
    <div className=" text-neutral-400 text-sm">
     Loading cascade predictions...
    </div>
   )}

   {!loading && cascades.length === 0 && (
    <div className=" text-neutral-400 text-sm">
     No cascade risks detected
    </div>
   )}

   {cascades.map((c,i)=>(
   
    <div
     key={i}
     className="bg-slate-800 p-4 rounded-lg"
    >

     <div className="flex justify-between mb-2">

      <div className="font-mono text-sm  text-neutral-300">
       VIN {c.vin}
      </div>

      <div className="text-red-400 font-semibold">
       {(c.total_risk*100).toFixed(1)}% risk
      </div>

     </div>

     <div className="flex flex-wrap gap-2 text-sm">

      {c.cascade_chain.map((comp,idx)=>(

       <div
        key={idx}
        className="flex items-center gap-2"
       >

        <span className="bg-slate-700 px-2 py-1 rounded">
         {comp}
        </span>

        {idx < c.cascade_chain.length-1 && (
         <span className=" text-neutral-400">
          →
         </span>
        )}

       </div>

      ))}

     </div>

    </div>

   ))}

  </div>

 </div>

 )

}