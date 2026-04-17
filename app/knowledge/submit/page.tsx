// Timestamp: 11 March 2026 19:43
// Knowledge Contribution Page

"use client"

import { useState } from "react"

export default function SubmitKnowledge(){

 const [title,setTitle] = useState("")
 const [url,setUrl] = useState("")
 const [component,setComponent] = useState("")
 const [summary,setSummary] = useState("")

 async function submit(){

  await fetch("/api/knowledge/submit",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    title,
    url,
    component,
    summary
   })

  })

  alert("Knowledge submitted")

 }

 return(

  <div className="p-8">

   <h1 className="text-3xl font-bold text-white mb-6">
    Submit Repair Knowledge
   </h1>

   <div className="bg-white text-gray-900 p-6 rounded shadow max-w-xl">

    <input
     placeholder="Title"
     className="w-full border p-2 mb-4"
     onChange={e=>setTitle(e.target.value)}
    />

    <input
     placeholder="Link (Facebook / Forum / YouTube)"
     className="w-full border p-2 mb-4"
     onChange={e=>setUrl(e.target.value)}
    />

    <input
     placeholder="Component (Engine, Clutch, Axle)"
     className="w-full border p-2 mb-4"
     onChange={e=>setComponent(e.target.value)}
    />

    <textarea
     placeholder="Short summary"
     className="w-full border p-2 mb-4"
     onChange={e=>setSummary(e.target.value)}
    />

    <button
     onClick={submit}
     className="bg-black text-white px-4 py-2 rounded"
    >
     Submit
    </button>

   </div>

  </div>

 )
}