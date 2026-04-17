// Timestamp: 11 March 2026 14:20
// Commentary:
// Complete Parts Finder page including:
// supplier comparison, failure intelligence,
// cross-reference parts and supplier ratings.

"use client"

import { useState } from "react"

export default function PartsSearchPage(){

 const [query,setQuery] = useState("")
 const [results,setResults] = useState<any[]>([])
 const [failureInfo,setFailureInfo] = useState<any>(null)
 const [crossRefs,setCrossRefs] = useState<any[]>([])
 const [scope,setScope] = useState("domestic")
 const [used,setUsed] = useState(false)

 async function search(){

  const res = await fetch(
   `/api/member/parts/search?q=${query}&scope=${scope}&used=${used}`
  )

  const data = await res.json()

  setResults(data.parts || [])
  setFailureInfo(data.failure_info)
  setCrossRefs(data.cross_references || [])

 }

 return(

 <div className="p-6 bg-gray-100 min-h-screen text-black">

  <div className="bg-white rounded shadow">

   {/* Panel Header */}

   <div className="bg-gray-200 px-4 py-3 border-b">

    <div className="text-xs text-gray-500 font-semibold">
     JustDefenders ©
    </div>

    <div className="text-lg font-bold">
     Parts Finder
    </div>

   </div>

   {/* Panel Body */}

   <div className="p-4">

    {/* Search Controls */}

    <div className="flex gap-4 mb-4">

     <input
      type="text"
      placeholder="Part number or component"
      className="border p-2 w-80 bg-white"
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
     />

     <select
      className="border p-2 bg-white"
      value={scope}
      onChange={(e)=>setScope(e.target.value)}
     >
      <option value="domestic">Domestic</option>
      <option value="global">Global</option>
     </select>

     <label className="flex items-center gap-2">

      <input
       type="checkbox"
       checked={used}
       onChange={(e)=>setUsed(e.target.checked)}
      />

      Used Parts

     </label>

     <button
      className="bg-blue-600 text-white px-4 py-2 rounded"
      onClick={search}
     >
      Search
     </button>

    </div>

    {/* Failure Intelligence */}

    {failureInfo && (

     <div className="bg-yellow-100 border border-yellow-400 p-4 mb-4 rounded">

      <div className="font-bold">
       Known Defender Issue
      </div>

      <div>
       Component: {failureInfo.component}
      </div>

      <div>
       Typical Failure Mileage: {failureInfo.average_mileage} km
      </div>

      <div>
       Risk Level: {failureInfo.risk_level}
      </div>

     </div>

    )}

    {/* Cross Reference Parts */}

    {crossRefs.length > 0 && (

     <div className="bg-blue-100 border border-blue-400 p-4 mb-4 rounded">

      <div className="font-bold mb-2">
       Compatible Alternative Parts
      </div>

      {crossRefs.map((ref,index)=>(

       <div key={index}>

        {ref.brand} — {ref.alternative_part_number}
        {" "}
        ({ref.description})

       </div>

      ))}

     </div>

    )}

    {/* Supplier Comparison Table */}

    <table className="w-full border border-gray-300">

     <thead>

      <tr className="bg-gray-200">

       <th className="p-2 border">Part</th>
       <th className="p-2 border">Supplier</th>
       <th className="p-2 border">Price</th>
       <th className="p-2 border">Stock</th>
       <th className="p-2 border">Distance</th>
       <th className="p-2 border">Rating</th>
       <th className="p-2 border">Condition</th>

      </tr>

     </thead>

     <tbody>

      {results.map((part,index)=>(

       <tr key={index}>

        <td className="p-2 border">

         {part.part_number}

        </td>

        <td className="p-2 border">

         {part.supplier}

        </td>

        <td className="p-2 border">

         ${part.price}

         {part.cheapest && (
          <span className="ml-2 text-yellow-600 font-bold">
           ⭐
          </span>
         )}

        </td>

        <td className="p-2 border">

         {part.stock_quantity}

        </td>

        <td className="p-2 border">

         {part.distance}

        </td>

        <td className="p-2 border">

         {"★".repeat(Math.round(part.rating))}

        </td>

        <td className="p-2 border">

         {part.condition}

        </td>

       </tr>

      ))}

     </tbody>

    </table>

   </div>

  </div>

 </div>

 )

}