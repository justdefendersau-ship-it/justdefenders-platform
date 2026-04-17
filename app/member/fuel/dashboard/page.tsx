// page.tsx
// Timestamp: 10 March 2026 10:47
// Commentary:
// Member fuel economy dashboard.

"use client"

import { useEffect,useState } from "react"

export default function FuelDashboard(){

 const [stats,setStats] = useState<any>(null)

 useEffect(()=>{

  fetch("/api/member/fuel/stats")
   .then(res=>res.json())
   .then(setStats)

 },[])


 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Fuel Economy
   </h1>

   {stats && (

    <div className="text-xl">

     Average Consumption:

     <span className="font-bold ml-2">

      {stats.average_consumption} L/100km

     </span>

    </div>

   )}

  </div>

 )
}