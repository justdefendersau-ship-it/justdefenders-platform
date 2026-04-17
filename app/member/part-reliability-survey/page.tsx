// Timestamp: 11 March 2026 14:45
// Commentary:
// Survey form allowing members to submit part reliability data.

"use client"

import { useState } from "react"

export default function PartSurvey(){

 const [part,setPart] = useState("")
 const [mileage,setMileage] = useState("")
 const [rating,setRating] = useState(5)
 const [comment,setComment] = useState("")

 async function submit(){

  await fetch("/api/member/part-reliability",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    part_number:part,
    mileage:Number(mileage),
    rating,
    comment
   })

  })

  alert("Thank you for your report")

 }

 return(

 <div className="p-6">

  <h1 className="text-xl font-bold mb-4">
   Part Reliability Report
  </h1>

  <input
   placeholder="Part Number"
   className="border p-2 mb-3 block"
   value={part}
   onChange={(e)=>setPart(e.target.value)}
  />

  <input
   placeholder="Mileage when replaced"
   className="border p-2 mb-3 block"
   value={mileage}
   onChange={(e)=>setMileage(e.target.value)}
  />

  <select
   className="border p-2 mb-3"
   value={rating}
   onChange={(e)=>setRating(Number(e.target.value))}
  >

   <option value="5">★★★★★ Very Reliable</option>
   <option value="4">★★★★ Good</option>
   <option value="3">★★★ Average</option>
   <option value="2">★★ Poor</option>
   <option value="1">★ Failed Early</option>

  </select>

  <textarea
   placeholder="Comments"
   className="border p-2 block w-96 h-24 mb-3"
   value={comment}
   onChange={(e)=>setComment(e.target.value)}
  />

  <button
   className="bg-blue-600 text-white px-4 py-2 rounded"
   onClick={submit}
  >
   Submit Report
  </button>

 </div>

 )

}