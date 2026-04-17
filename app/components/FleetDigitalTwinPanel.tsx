"use client"

/*
Timestamp: 8 March 2026 — 23:30
Fleet Digital Twin Universe Panel
*/

import { useEffect,useState } from "react"

export default function FleetDigitalTwinPanel(){

 const [twins,setTwins] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/fleet-digital-twins")
   const json = await res.json()

   if(Array.isArray(json)){
    setTwins(json)
   }

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Fleet Digital Twin Universe
   </h2>

   <div className="space-y-3">

    {twins.map((t,i)=>{

     const riskColor =
      t.riskLevel === "high"
       ? "text-red-400"
       : t.riskLevel === "medium"
       ? "text-yellow-400"
       : "text-green-400"

     return(

      <div
       key={i}
       className="p-3 bg-slate-800 border border-slate-600 rounded"
      >

       <div className="font-semibold">
        {t.vin}
       </div>

       <div className="text-sm text-slate-300">
        Health Score: {t.healthScore}
       </div>

       <div className={`text-sm ${riskColor}`}>
        Risk Level: {t.riskLevel}
       </div>

       <div className="text-xs text-slate-400">
        Predicted Failure: {t.predictedFailure}
       </div>

      </div>

     )

    })}

   </div>

  </div>

 )
}