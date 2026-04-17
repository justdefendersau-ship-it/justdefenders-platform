"use client"

/*
Timestamp 9 March 2026 04:20
Fuel Log + CSV Import
*/

import { useState,useEffect } from "react"

export default function FuelPage(){

 const [logs,setLogs] = useState<any[]>([])
 const [litres,setLitres] = useState("")
 const [odometer,setOdometer] = useState("")

 async function save(){

  await fetch("/api/member/fuel",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    litres,
    odometer
   })

  })

  load()

 }

 async function uploadCSV(file:File){

  const formData = new FormData()

  formData.append("file",file)

  await fetch("/api/member/fuel-import",{

   method:"POST",
   body:formData

  })

  load()

 }

 async function load(){

  const res = await fetch("/api/member/fuel")
  const json = await res.json()

  setLogs(json)

 }

 useEffect(()=>{

  load()

 },[])

 return(

  <div className="p-6 space-y-4">

   <h1 className="text-2xl font-semibold">
    Fuel Log
   </h1>

   <input
    placeholder="Litres"
    value={litres}
    onChange={(e)=>setLitres(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <input
    placeholder="Odometer"
    value={odometer}
    onChange={(e)=>setOdometer(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <button
    onClick={save}
    className="px-4 py-2 bg-blue-600 text-white rounded"
   >
    Add Fuel Entry
   </button>

   <div className="mt-4">

    <label className="block mb-2">
     Import CSV
    </label>

    <input
     type="file"
     accept=".csv"
     onChange={(e)=>{

      if(e.target.files?.length){

       uploadCSV(e.target.files[0])

      }

     }}
    />

   </div>

   <div className="space-y-3">

    {logs.map((l,i)=>(
     
     <div key={i} className="p-3 border rounded">

      <div>Litres: {l.litres}</div>

      <div>Odometer: {l.odometer}</div>

     </div>

    ))}

   </div>

  </div>

 )
}