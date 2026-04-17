"use client"

// Timestamp 6 March 2026 20:05
// File: /app/ownership/page.tsx

import { useEffect, useState } from "react"

export default function OwnershipDashboard(){

 const [vehicles,setVehicles] = useState<any[]>([])

 useEffect(()=>{

   fetch("/api/ownership/list")
   .then(r=>r.json())
   .then(d=>setVehicles(d.vehicles))

 },[])

 return (

   <div className="p-10 space-y-6">

     <h1 className="text-3xl font-bold">

       Defender Ownership Intelligence

     </h1>

     {vehicles.map((v,i)=>(

       <div key={i} className="border-b py-3">

         <div>VIN: {v.vin}</div>
         <div>Annual Cost: ${v.annual_cost}</div>
         <div>Cost per km: {v.cost_per_km}</div>
         <div>Lifecycle Score: {v.lifecycle_score}</div>

       </div>

     ))}

   </div>

 )

}