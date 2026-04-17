/* Timestamp: 12 March 2026 22:10 */
/* Mobile Companion Diagnostic Panel */

"use client"

import { useEffect, useState } from "react"

export default function MobileDiagnosticPanel(){

 const [status,setStatus] = useState<any>(null)

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/mobile/diagnostic")

   const data = await res.json()

   setStatus(data)

  }

  load()

 },[])

 if(!status){

  return(
   <div className="text-xs text-gray-400">
    Checking mobile connection...
   </div>
  )

 }

 return(

  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

   <div className="text-sm text-gray-400 mb-3">
    Mobile Companion Status
   </div>

   <div className="text-xs text-gray-300">
    Database: {status.database}
   </div>

   <div className="text-xs text-gray-300">
    Vehicles: {status.vehicles}
   </div>

   <div className="text-xs text-gray-500 mt-2">
    {status.timestamp}
   </div>

  </div>

 )

}