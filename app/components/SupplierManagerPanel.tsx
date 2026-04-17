/*
Timestamp: 8 March 2026 — 03:55
File: /app/components/SupplierManagerPanel.tsx

Purpose:
Admin interface to manage supplier list.
*/

"use client"

import { useEffect,useState } from "react"

export default function SupplierManagerPanel(){

 const [suppliers,setSuppliers] = useState<any[]>([])
 const [name,setName] = useState("")

 async function load(){

  const res = await fetch("/api/suppliers")

  const data = await res.json()

  if(Array.isArray(data)){
   setSuppliers(data)
  }

 }

 async function add(){

  await fetch("/api/suppliers",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    supplier_name:name
   })

  })

  setName("")
  load()

 }

 async function remove(id:number){

  await fetch(`/api/suppliers?id=${id}`,{
   method:"DELETE"
  })

  load()

 }

 useEffect(()=>{

  load()

 },[])

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   Supplier Registry

  </h2>

  <div className="flex gap-3 mb-4">

   <input
    value={name}
    onChange={(e)=>setName(e.target.value)}
    placeholder="New supplier..."
    className="flex-1 bg-neutral-800 px-4 py-2 rounded"
   />

   <button
    onClick={add}
    className="bg-slate-800 px-4 py-2 rounded"
   >
    Add
   </button>

  </div>

  <div className="space-y-2">

   {suppliers.map(s=>(
    <div
     key={s.id}
     className="bg-slate-800 p-3 rounded flex justify-between"
    >

     <div>

      {s.supplier_name}

     </div>

     <button
      onClick={()=>remove(s.id)}
      className="text-red-400"
     >
      Remove
     </button>

    </div>
   ))}

  </div>

 </div>

 )

}