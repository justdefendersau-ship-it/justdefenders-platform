"use client"

/*
Timestamp: 8 March 2026 — 21:05
Global Component Reliability Ranking
*/

import { useEffect,useState } from "react"

export default function ComponentReliabilityRanking(){

 const [data,setData] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/component-reliability")
   const json = await res.json()

   setData(json)

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Global Component Reliability
   </h2>

   <div className="space-y-2">

    {data.map((c,i)=>(
     
     <div
      key={i}
      className="p-2 bg-slate-800 border border-slate-600 rounded"
     >
      {c.component} — Score {c.score}
     </div>

    ))}

   </div>

  </div>

 )
}