"use client"

/*
Timestamp: 8 March 2026 — 22:05
Global Defender Reliability Intelligence Network Panel
*/

import { useEffect,useState } from "react"

export default function GlobalReliabilityNetworkPanel(){

 const [data,setData] = useState<any>(null)
 const [failures,setFailures] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const fleetRes = await fetch("/api/network/global-fleet-data")
   const fleetJson = await fleetRes.json()

   setData(fleetJson)

   const failureRes = await fetch("/api/network/global-failure-intelligence")
   const failureJson = await failureRes.json()

   setFailures(failureJson)

  }

  load()

 },[])

 if(!data){
  return <div className="p-6 text-slate-300">Loading global network…</div>
 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Global Defender Reliability Network
   </h2>

   <div className="text-sm text-slate-300 mb-4">

    Fleets: {data.fleets}  
    Vehicles: {data.vehicles}  
    Recorded Failures: {data.failures}

   </div>

   <div className="space-y-2">

    {failures.map((f,i)=>(
     
     <div
      key={i}
      className="p-2 bg-slate-800 border border-slate-600 rounded"
     >

      {f.component} — Global Failure Rate {f.globalFailureRate}%

     </div>

    ))}

   </div>

  </div>

 )

}