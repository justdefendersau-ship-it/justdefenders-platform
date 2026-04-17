// Timestamp: 13 March 2026 03:52
// My Shed page
// Displays vehicles and links to vehicle intelligence dashboard

"use client"

import { useEffect,useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function ShedPage(){

 const [vehicles,setVehicles] = useState<any[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function loadVehicles(){

   const { data,error } = await supabase
    .from("vehicles")
    .select("*")
    .order("year",{ascending:true})

   if(error){
    console.error(error)
   }

   setVehicles(data || [])
   setLoading(false)

  }

  loadVehicles()

 },[])


 if(loading){
  return <div className="p-6">Loading vehicles...</div>
 }


 return(

  <div className="p-6">

   <h1 className="text-2xl font-bold mb-8">
    My Shed
   </h1>

   <div className="grid grid-cols-3 gap-6">

    {vehicles
     .filter(v => v.vin)
     .map((v:any)=>(

     <Link href={`/vehicle/${v.vin}`}>

       <div className="bg-white rounded shadow p-5 hover:shadow-lg cursor-pointer">

        <div className="text-lg font-bold">
         {v.year} {v.model}
        </div>

        {v.variant && (
         <div className="text-gray-600">
          {v.variant}
         </div>
        )}

        <div className="mt-2 text-sm">
         Engine: {v.engine}
        </div>

        <div className="text-sm">
         VIN: {v.vin}
        </div>

        {v.nickname && (
         <div className="italic text-gray-500 mt-2">
          "{v.nickname}"
         </div>
        )}

       </div>

      </Link>

    ))}

   </div>

  </div>

 )

}