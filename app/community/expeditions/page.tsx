// page.tsx
// Timestamp: 10 March 2026 16:57
// Commentary:
// Displays community expedition reports.

"use client"

import { useEffect,useState } from "react"

export default function Expeditions(){

 const [reports,setReports] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/community/expeditions")
   .then(res=>res.json())
   .then(setReports)

 },[])

 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Community Expeditions
   </h1>

   {reports.map(r=>(

    <div
     key={r.id}
     className="border rounded p-4 space-y-2"
    >

     <div className="font-semibold text-lg">
      {r.title}
     </div>

     <div>
      {r.summary}
     </div>

     <div className="text-sm text-neutral-600">
      Vehicle Setup: {r.vehicle_setup}
     </div>

     <div className="text-sm">
      Fuel Capacity: {r.fuel_capacity} L
     </div>

    </div>

   ))}

  </div>

 )
}