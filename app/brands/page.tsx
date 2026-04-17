"use client"

// Timestamp 7 March 2026 00:30
// File: /app/brands/page.tsx

import { useEffect,useState } from "react"

export default function Brands(){

 const [brands,setBrands] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/ai/brand-intelligence")
  .then(r=>r.json())
  .then(d=>setBrands(d.brands))

 },[])

 return(

 <div className="p-10 space-y-6">

  <h1 className="text-3xl font-bold">
   Vehicle Intelligence Platform
  </h1>

  {brands.map((b,i)=>(

   <div key={i} className="border-b py-3">

    <div>Brand: {b.brand}</div>
    <div>Models: {b.models}</div>

   </div>

  ))}

 </div>

 )

}