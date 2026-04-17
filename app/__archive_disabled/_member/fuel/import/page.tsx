// page.tsx
// Timestamp: 10 March 2026 10:42
// Commentary:
// CSV fuel log import page for members.

"use client"

import { useState } from "react"

export default function FuelImportPage(){

 const [rows,setRows] = useState<any[]>([])

 function parseCSV(text:string){

  const lines = text.split("\n")

  const parsed = lines.slice(1).map(line=>{

   const [date,litres,odometer,price,station] = line.split(",")

   return {

    date,
    litres:Number(litres),
    odometer:Number(odometer),
    price:Number(price),
    station

   }

  })

  setRows(parsed)

 }


 async function upload(){

  await fetch("/api/member/fuel/import",{

   method:"POST",
   headers:{ "Content-Type":"application/json" },

   body:JSON.stringify({ rows })

  })

  alert("Fuel logs imported")

 }


 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Import Fuel Logs
   </h1>

   <input
    type="file"
    accept=".csv"
    onChange={async (e)=>{

     const file = e.target.files?.[0]

     if(!file) return

     const text = await file.text()

     parseCSV(text)

    }}
   />

   <button
    onClick={upload}
    className="bg-blue-600 text-white px-4 py-2 rounded"
   >
    Import
   </button>

   <div className="text-sm text-neutral-600">

    Expected CSV format:

    date,litres,odometer,price,station

   </div>

  </div>

 )
}