"use client"

/*
Timestamp 9 March 2026 03:25
Member Vehicles Page
*/

import { useEffect,useState } from "react"

export default function MyVehicles(){

 const [vehicles,setVehicles] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/member/vehicles")
   const json = await res.json()

   setVehicles(json)

  }

  load()

 },[])

 return(

  <div className="p-6">

   <h1 className="text-2xl font-semibold mb-4">
    My Vehicles
   </h1>

   <div className="space-y-3">

    {vehicles.map((v,i)=>(
     
     <div key={i} className="p-3 border rounded">

      <div className="font-semibold">
       {v.vin}
      </div>

      <div className="text-sm">
       {v.model} ({v.year})
      </div>

     </div>

    ))}

   </div>

  </div>

 )
}