// page.tsx
// Timestamp: 10 March 2026 18:20
// Commentary:
// Calculates vehicle running costs.

"use client"

import { useEffect,useState } from "react"

export default function RunningCosts(){

 const [stats,setStats] = useState<any>(null)

 useEffect(()=>{

  fetch("/api/member/costs")
   .then(res=>res.json())
   .then(setStats)

 },[])

 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Running Costs
   </h1>

   {stats && (

    <div className="space-y-2">

     <div>
      Fuel Cost per km:
      <strong> ${stats.fuel_per_km}</strong>
     </div>

     <div>
      Maintenance Cost per km:
      <strong> ${stats.maintenance_per_km}</strong>
     </div>

     <div>
      Total Running Cost:
      <strong> ${stats.total_per_km}</strong>
     </div>

    </div>

   )}

  </div>

 )
}