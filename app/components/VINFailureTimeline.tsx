"use client"

/*
Timestamp: 8 March 2026 — 20:30
VIN Predictive Failure Timeline
*/

import { useEffect,useState } from "react"

export default function VINFailureTimeline({vin}:{vin:string}){

 const [events,setEvents] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch(`/api/analytics/vin-timeline/${vin}`)
   const json = await res.json()

   if(Array.isArray(json)){
    setEvents(json)
   }

  }

  load()

 },[vin])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Predicted Failure Timeline
   </h2>

   <div className="space-y-2">

    {events.map((e,i)=>(
     
     <div
      key={i}
      className="p-2 rounded bg-slate-800 border border-slate-600"
     >
      {e.km} km → {e.event}
     </div>

    ))}

   </div>

  </div>

 )
}