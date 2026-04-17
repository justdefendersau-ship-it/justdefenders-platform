// page.tsx
// Timestamp: 10 March 2026 14:02
// Commentary:
// Allows members to create a trip log.

"use client"

import { useState } from "react"

export default function NewTrip(){

 const [name,setName] = useState("")
 const [startOdo,setStartOdo] = useState("")
 const [notes,setNotes] = useState("")

 async function createTrip(){

  await fetch("/api/member/trips/create",{

   method:"POST",

   headers:{ "Content-Type":"application/json" },

   body:JSON.stringify({

    trip_name:name,
    start_odometer:Number(startOdo),
    notes

   })

  })

  alert("Trip created")

 }

 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Start New Trip
   </h1>

   <input
    placeholder="Trip Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    className="border px-3 py-2 rounded w-80"
   />

   <input
    placeholder="Start Odometer"
    value={startOdo}
    onChange={(e)=>setStartOdo(e.target.value)}
    className="border px-3 py-2 rounded w-80"
   />

   <textarea
    placeholder="Trip Notes"
    value={notes}
    onChange={(e)=>setNotes(e.target.value)}
    className="border px-3 py-2 rounded w-80"
   />

   <button
    onClick={createTrip}
    className="bg-blue-600 text-white px-4 py-2 rounded"
   >
    Create Trip
   </button>

  </div>

 )
}