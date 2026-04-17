"use client"

/*
Timestamp 9 March 2026 03:55
My Shed Inventory
*/

import { useState,useEffect } from "react"

export default function MyShed(){

 const [items,setItems] = useState<any[]>([])
 const [part,setPart] = useState("")

 async function save(){

  await fetch("/api/member/my-shed",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    part
   })

  })

  load()

 }

 async function load(){

  const res = await fetch("/api/member/my-shed")
  const json = await res.json()

  setItems(json)

 }

 useEffect(()=>{

  load()

 },[])

 return(

  <div className="p-6 space-y-4">

   <h1 className="text-2xl font-semibold">
    My Shed
   </h1>

   <input
    placeholder="Part Name"
    value={part}
    onChange={(e)=>setPart(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <button
    onClick={save}
    className="px-4 py-2 bg-blue-600 text-white rounded"
   >
    Add Part
   </button>

   <div className="space-y-3">

    {items.map((i,index)=>(
     
     <div key={index} className="p-3 border rounded">

      {i.part}

     </div>

    ))}

   </div>

  </div>

 )
}