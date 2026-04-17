// page.tsx
// Timestamp: 10 March 2026 16:53
// Commentary:
// Allows members to publish a community trip report.

"use client"

import { useState } from "react"

export default function TripReport(){

 const [title,setTitle] = useState("")
 const [summary,setSummary] = useState("")
 const [vehicle,setVehicle] = useState("")
 const [tyres,setTyres] = useState("")
 const [fuel,setFuel] = useState("")
 const [spares,setSpares] = useState("")

 async function publish(){

  await fetch("/api/member/trips/publish",{

   method:"POST",

   headers:{ "Content-Type":"application/json" },

   body:JSON.stringify({

    title,
    summary,
    vehicle_setup:vehicle,
    tyre_setup:tyres,
    fuel_capacity:Number(fuel),
    spare_parts:spares,
    published:true

   })

  })

  alert("Trip report published")

 }

 return(

  <div className="p-6 space-y-4">

   <h1 className="text-2xl font-bold">
    Publish Trip Report
   </h1>

   <input
    placeholder="Trip Title"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    className="border px-3 py-2 rounded w-96"
   />

   <textarea
    placeholder="Trip Summary"
    value={summary}
    onChange={(e)=>setSummary(e.target.value)}
    className="border px-3 py-2 rounded w-96"
   />

   <input
    placeholder="Vehicle Setup"
    value={vehicle}
    onChange={(e)=>setVehicle(e.target.value)}
    className="border px-3 py-2 rounded w-96"
   />

   <input
    placeholder="Tyre Setup"
    value={tyres}
    onChange={(e)=>setTyres(e.target.value)}
    className="border px-3 py-2 rounded w-96"
   />

   <input
    placeholder="Fuel Capacity (L)"
    value={fuel}
    onChange={(e)=>setFuel(e.target.value)}
    className="border px-3 py-2 rounded w-96"
   />

   <textarea
    placeholder="Spare Parts Carried"
    value={spares}
    onChange={(e)=>setSpares(e.target.value)}
    className="border px-3 py-2 rounded w-96"
   />

   <button
    onClick={publish}
    className="bg-blue-600 text-white px-4 py-2 rounded"
   >
    Publish
   </button>

  </div>

 )
}