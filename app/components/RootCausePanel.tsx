"use client"

/*
Timestamp: 8 March 2026 — 20:50
AI Root Cause Analysis Panel
*/

import { useEffect,useState } from "react"

export default function RootCausePanel(){

 const [data,setData] = useState<any>(null)

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/root-cause-analysis")
   const json = await res.json()

   setData(json)

  }

  load()

 },[])

 if(!data){
  return <div className="p-6 text-slate-300">Analyzing failures…</div>
 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    AI Root Cause Analysis
   </h2>

   <div className="text-sm text-slate-300 mb-3">
    Root Cause: {data.rootCause}
   </div>

   <div className="space-y-1 text-sm text-slate-300">

    {data.cascade.map((c:any,i:number)=>(
     <div key={i}>
      → {c}
     </div>
    ))}

   </div>

   <div className="text-xs text-slate-400 mt-3">
    Confidence: {data.confidence}%
   </div>

  </div>

 )
}