// Timestamp: 11 March 2026 08:35
// Commentary:
// Supplier performance survey form for members.

"use client"

import {useState} from "react"

export default function SupplierSurvey(){

 const [supplier,setSupplier] = useState("")
 const [rating,setRating] = useState(5)
 const [comment,setComment] = useState("")

 async function submit(){

  await fetch("/api/member/supplier-survey",{
   method:"POST",
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({supplier,rating,comment})
  })

  alert("Thank you for your feedback")

 }

 return(

 <div className="p-6">

  <h1 className="text-xl font-bold mb-4">
   Supplier Performance Survey
  </h1>

  <input
   placeholder="Supplier"
   className="border p-2 mb-3 block"
   value={supplier}
   onChange={(e)=>setSupplier(e.target.value)}
  />

  <select
   className="border p-2 mb-3"
   value={rating}
   onChange={(e)=>setRating(Number(e.target.value))}
  >

   <option value="5">★★★★★ Excellent</option>
   <option value="4">★★★★ Good</option>
   <option value="3">★★★ Average</option>
   <option value="2">★★ Poor</option>
   <option value="1">★ Bad</option>

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
   Submit
  </button>

 </div>

 )

}