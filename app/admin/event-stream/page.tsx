"use client"

// Timestamp 7 March 2026 05:40
// Event Stream Dashboard

import { useEffect,useState } from "react"

export default function EventStream(){

 const [events,setEvents] = useState<any[]>([])

 async function load(){

  const res =
   await fetch("/api/events/list")

  const data = await res.json()

  setEvents(data.events)

 }

 useEffect(()=>{

  load()

  const timer = setInterval(load,5000)

  return ()=>clearInterval(timer)

 },[])

 return(

 <div className="p-10 space-y-6">

  <h1 className="text-3xl font-bold">
   Real-Time Reliability Event Stream
  </h1>

  {events.map((e,i)=>(

   <div key={i} className="border p-3">

    <div>Event: {e.event_type}</div>
    <div>Entity: {e.entity_id}</div>
    <div>Time: {e.created_at}</div>

   </div>

  ))}

 </div>

 )

}