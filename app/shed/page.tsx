// Timestamp: 11 March 2026 14:15
// My Shed Dashboard
// Central ownership hub for Defender vehicles

"use client"

import { useEffect,useState } from "react"
import Link from "next/link"

export default function ShedPage(){

 const [vehicles,setVehicles] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/member/vehicles")
   .then(res=>res.json())
   .then(data=>setVehicles(data))

 },[])

 return(

  <div>

   {/* Header */}

   <div className="bg-gray-300 p-4 rounded mb-6">
    <h1 className="text-xl font-bold">
     My Shed
    </h1>
   </div>


   {/* Vehicle Cards */}

   <div className="grid grid-cols-3 gap-6">

    {vehicles.map(v=>(
     <Link key={v.id} href={`/member/vehicles/${v.id}`}>

      <div className="bg-white rounded shadow p-4 cursor-pointer">

       {v.image_url && (
        <img
         src={v.image_url}
         className="rounded mb-3 h-32 w-full object-cover"
        />
       )}

       <h2 className="font-bold text-lg">
        {v.year} {v.model}
       </h2>

       <p className="text-sm text-gray-600">
        Engine: {v.engine}
       </p>

       <p className="text-sm">
        VIN: {v.vin}
       </p>

       <p className="text-sm">
        Registration: {v.registration_number}
       </p>

      </div>

     </Link>
    ))}

   </div>

  </div>

 )

}