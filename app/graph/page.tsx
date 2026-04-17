"use client"

// Timestamp 7 March 2026 01:00
// File: /app/graph/page.tsx

import { useState } from "react"

export default function GraphExplorer(){

 const [node,setNode] = useState("")
 const [data,setData] = useState<any>(null)

 async function search(){

  const res =
   await fetch(`/api/ai/query-knowledge-graph?node=${node}`)

  const result = await res.json()

  setData(result)

 }

 return(

 <div className="p-10 space-y-6">

  <h1 className="text-3xl font-bold">
   Vehicle Reliability Knowledge Graph
  </h1>

  <div className="flex space-x-2">

   <input
   value={node}
   onChange={(e)=>setNode(e.target.value)}
   placeholder="Enter component or supplier"
   className="border p-3 w-full"
   />

   <button
   onClick={search}
   className="bg-black text-white px-4 py-2 rounded"
   >
   Explore
   </button>

  </div>

  {data && (

   <pre className="bg-gray-100 p-6 overflow-x-scroll">

   {JSON.stringify(data,null,2)}

   </pre>

  )}

 </div>

 )

}