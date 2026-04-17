// page.tsx
// Timestamp: 10 March 2026 17:23
// Commentary:
// Allows members to upload trip photos or GPX tracks.

"use client"

import { useState } from "react"

export default function UploadTripFiles(){

 const [trip,setTrip] = useState("")
 const [file,setFile] = useState<File|null>(null)

 async function upload(){

  if(!file) return

  const formData = new FormData()

  formData.append("trip_id",trip)
  formData.append("file",file)

  await fetch("/api/member/trips/upload",{

   method:"POST",
   body:formData

  })

  alert("Upload complete")

 }

 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Upload Trip Photos / GPX
   </h1>

   <input
    placeholder="Trip ID"
    value={trip}
    onChange={(e)=>setTrip(e.target.value)}
    className="border px-3 py-2 rounded"
   />

   <input
    type="file"
    accept=".jpg,.png,.gpx"
    onChange={(e)=>setFile(e.target.files?.[0] || null)}
   />

   <button
    onClick={upload}
    className="bg-blue-600 text-white px-4 py-2 rounded"
   >
    Upload
   </button>

  </div>

 )
}