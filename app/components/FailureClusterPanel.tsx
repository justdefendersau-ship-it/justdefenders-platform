"use client"

/*
Timestamp: 8 March 2026 — 17:30
Failure Cluster Detection Panel

Displays emerging component failure clusters across the fleet.
*/

import { useEffect, useState } from "react"

export default function FailureClusterPanel(){

 const [clusters,setClusters] = useState<any[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/failure-clusters")
    const data = await res.json()

    if(Array.isArray(data)){
     setClusters(data)
    }else{
     console.error("Invalid cluster response:",data)
     setClusters([])
    }

   }catch(err){
    console.error("Cluster load error:",err)
   }

   setLoading(false)

  }

  load()

 },[])

 return (

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Failure Cluster Detection
   </h2>

   {loading && (
    <div className="text-sm text-slate-300">
     Analyzing fleet failure patterns…
    </div>
   )}

   {!loading && clusters.length === 0 && (

    <div className="text-sm text-slate-300">
     No emerging failure clusters detected.
    </div>

   )}

   {!loading && clusters.length > 0 && (

    <div className="space-y-2">

     {clusters.map((cluster,i)=>(
      
      <div
       key={i}
       className="p-3 rounded-lg bg-slate-800 border border-slate-600"
      >

       <div className="font-semibold">
        {cluster.component}
       </div>

       <div className="text-xs text-slate-300">
        {cluster.count} failures detected
       </div>

      </div>

     ))}

    </div>

   )}

  </div>

 )

}