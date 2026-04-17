"use client"

/*
Timestamp 9 March 2026 06:30
Maintenance Schedule Engine UI
*/

import { useState } from "react"

export default function MaintenanceSchedule(){

 const [mileage,setMileage] = useState("")
 const [items,setItems] = useState<any[]>([])

 async function check(){

  const res = await fetch("/api/maintenance/schedule",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    mileage:Number(mileage)
   })

  })

  const json = await res.json()

  setItems(json)

 }

 return(

  <div className="p-6 space-y-4">

   <h1 className="text-2xl font-semibold">
    Maintenance Schedule
   </h1>

   <input
    placeholder="Current Mileage"
    value={mileage}
    onChange={(e)=>setMileage(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <button
    onClick={check}
    className="px-4 py-2 bg-blue-600 text-white rounded"
   >
    Check Service Schedule
   </button>

   <div className="space-y-3">

    {items.map((s,i)=>(
     
     <div key={i} className="p-3 border rounded">

      <div className="font-semibold">
       {s.service}
      </div>

      <div className="text-sm">
       Interval: {s.interval} km
      </div>

      <div className="text-sm">
       Recommended Part: {s.part}
      </div>

     </div>

    ))}

   </div>

  </div>

 )
}