/*
Timestamp: 8 March 2026 — 07:25
File: /app/analytics/ReliabilityTimeline.tsx

Purpose:
Display Defender reliability timeline.

Safe rendering prevents crashes if API
returns empty or invalid data.
*/

"use client"

import { useEffect, useState } from "react"

interface TimelineItem {

 date: string
 failures: number

}

export default function ReliabilityTimeline(){

 const [timeline,setTimeline] = useState<TimelineItem[]>([])
 const [loading,setLoading] = useState(true)

 async function load(){

  try{

   const res = await fetch("/api/analytics/reliability-timeline")

   const data = await res.json()

   if(Array.isArray(data)){

    setTimeline(data)

   }else{

    console.error("Invalid timeline response:",data)
    setTimeline([])

   }

  }catch(err){

   console.error("Timeline fetch failed:",err)
   setTimeline([])

  }finally{

   setLoading(false)

  }

 }

 useEffect(()=>{

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">

    Defender Reliability Timeline

   </h2>

   {loading && (

    <div className="text-sm  text-neutral-400">
     Loading timeline...
    </div>

   )}

   {!loading && timeline.length === 0 && (

    <div className="text-sm  text-neutral-400">
     No failure data recorded yet
    </div>

   )}

   <div className="space-y-2">

    {(timeline || []).map((t,i)=>(

     <div
      key={i}
      className="bg-slate-800 p-3 rounded flex justify-between"
     >

      <div>

       {t.date}

      </div>

      <div className="text-red-400">

       {t.failures}

      </div>

     </div>

    ))}

   </div>

  </div>

 )

}