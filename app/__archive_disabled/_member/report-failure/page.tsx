"use client"

/*
Timestamp 9 March 2026 06:00
Community Failure Report Page
*/

import { useState } from "react"

export default function ReportFailure(){

 const [vin,setVin] = useState("")
 const [component,setComponent] = useState("")
 const [mileage,setMileage] = useState("")
 const [symptoms,setSymptoms] = useState("")
 const [repair,setRepair] = useState("")

 async function submit(){

  await fetch("/api/community/reports",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    vin,
    component,
    mileage,
    symptoms,
    repair

   })

  })

  alert("Report submitted")

 }

 return(

  <div className="p-6 space-y-4">

   <h1 className="text-2xl font-semibold">
    Report Reliability Issue
   </h1>

   <input
    placeholder="VIN"
    value={vin}
    onChange={(e)=>setVin(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <input
    placeholder="Component"
    value={component}
    onChange={(e)=>setComponent(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <input
    placeholder="Mileage"
    value={mileage}
    onChange={(e)=>setMileage(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <textarea
    placeholder="Symptoms"
    value={symptoms}
    onChange={(e)=>setSymptoms(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <textarea
    placeholder="Repair Notes"
    value={repair}
    onChange={(e)=>setRepair(e.target.value)}
    className="w-full p-2 border rounded"
   />

   <button
    onClick={submit}
    className="px-4 py-2 bg-blue-600 text-white rounded"
   >
    Submit Report
   </button>

  </div>

 )
}