// page.tsx
// Timestamp: 9 March 2026 22:20
// Commentary:
// Defender Parts Search page with Add to My Shed functionality.

"use client"

import { useState } from "react"

export default function PartsSearchPage(){

 const [query,setQuery] = useState("")
 const [condition,setCondition] = useState("all")
 const [results,setResults] = useState<any[]>([])

 async function search(){

  const res = await fetch(
   `/api/member/parts-search?query=${query}&condition=${condition}`
  )

  const data = await res.json()

  setResults(data)

 }


 async function addToShed(part:any){

  await fetch("/api/member/shed/add-from-search",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    part_name:part.part_name,
    part_number:part.part_number,
    supplier:part.supplier

   })

  })

  alert("Part added to My Shed")

 }


 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Defender Parts Search
   </h1>


   {/* Search Controls */}

   <div className="flex gap-4">

    <input
     value={query}
     onChange={(e)=>setQuery(e.target.value)}
     placeholder="Search part name or number"
     className="border px-3 py-2 rounded w-80"
    />

    <select
     value={condition}
     onChange={(e)=>setCondition(e.target.value)}
     className="border px-3 py-2 rounded"
    >

     <option value="all">All</option>
     <option value="new">New</option>
     <option value="used">Used</option>
     <option value="refurbished">Refurbished</option>

    </select>

    <button
     onClick={search}
     className="bg-blue-600 text-white px-4 py-2 rounded"
    >
     Search
    </button>

   </div>


   {/* Results */}

   <div className="space-y-4">

    {results.map((p)=>{

     return(

      <div
       key={p.id}
       className="border rounded p-4 flex justify-between items-center"
      >

       <div>

        <div className="font-semibold text-lg">
         {p.part_name}
        </div>

        <div className="text-sm text-neutral-600">
         Part Number: {p.part_number}
        </div>

        <div className="text-sm">
         Supplier: {p.supplier}
        </div>

        <div className="text-sm">
         Condition: {p.condition}
        </div>

       </div>


       <div className="flex flex-col items-end gap-2">

        <div className="text-lg font-bold">
         ${p.price}
        </div>

        <button
         onClick={()=>addToShed(p)}
         className="bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
         Add to My Shed
        </button>

       </div>

      </div>

     )

    })}

   </div>

  </div>

 )

}