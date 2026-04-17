// Timestamp: 11 March 2026 18:35
// Technical Reference System
// Displays Defender component categories

"use client"

import { useEffect,useState } from "react"
import Link from "next/link"

export default function ReferencePage(){

 const [components,setComponents] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/reference")
   .then(res=>res.json())
   .then(data=>setComponents(data || []))

 },[])

 return(

  <div>

   {/* Header */}

   <div className="bg-gray-300 p-4 rounded mb-6">

    <h1 className="text-xl font-bold">
     Technical Reference
    </h1>

   </div>


   {/* Components Grid */}

   <div className="grid grid-cols-3 gap-6">

    {components.map(c=>(
     <Link key={c.id} href={`/reference/${c.id}`}>

      <div className="bg-white p-6 rounded shadow cursor-pointer">

       <h2 className="font-bold text-lg">
        {c.component_name}
       </h2>

       <p className="text-sm text-gray-600 mt-2">
        {c.description}
       </p>

      </div>

     </Link>
    ))}

   </div>

  </div>

 )

}