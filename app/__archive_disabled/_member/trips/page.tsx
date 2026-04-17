// page.tsx
// Timestamp: 10 March 2026 14:05
// Commentary:
// Displays member trip history.

"use client"

import { useEffect,useState } from "react"

export default function TripHistory(){

 const [trips,setTrips] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/member/trips/list")
   .then(res=>res.json())
   .then(setTrips)

 },[])

 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Trip History
   </h1>

   {trips.map(t=>(

    <div
     key={t.id}
     className="border rounded p-4"
    >

     <div className="font-semibold">
      {t.trip_name}
     </div>

     <div className="text-sm">
      {t.start_date} → {t.end_date}
     </div>

     <div className="text-sm">
      Distance: {t.end_odometer - t.start_odometer} km
     </div>

    </div>

   ))}

  </div>

 )
}