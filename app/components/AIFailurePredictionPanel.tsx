"use client"

/*
Timestamp: 8 March 2026 — 21:25
Autonomous Reliability Intelligence Agent Panel
*/

import { useEffect,useState } from "react"

export default function AutonomousAgentPanel(){

 const [data,setData] = useState<any>(null)

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/autonomous-agent")
   const json = await res.json()

   setData(json)

  }

  load()

 },[])

 if(!data){

  return(
   <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">
    Running autonomous fleet analysis…
   </div>
  )

 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Autonomous Reliability Agent
   </h2>

   <div className="text-xs text-slate-400 mb-3">
    Last Scan: {data.scanTime}
   </div>

   <div className="space-y-2">

    {data.findings.map((f:any,i:number)=>(
     
     <div
      key={i}
      className="p-2 bg-slate-800 border border-slate-600 rounded"
     >
      {f.message} ({f.confidence}%)
     </div>

    ))}

   </div>

   <div className="mt-4">

    <h3 className="text-sm font-semibold mb-2">
     Recommendations
    </h3>

    {data.recommendations.map((r:any,i:number)=>(
     
     <div key={i} className="text-sm text-slate-300">
      • {r}
     </div>

    ))}

   </div>

  </div>

 )

}