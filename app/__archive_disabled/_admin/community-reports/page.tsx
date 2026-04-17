"use client"

/*
Timestamp 9 March 2026 06:00
Community Reports Admin Panel
*/

import { useEffect,useState } from "react"

export default function CommunityReports(){

 const [reports,setReports] = useState<any[]>([])

 async function load(){

  const res = await fetch("/api/community/reports")

  const json = await res.json()

  setReports(json)

 }

 useEffect(()=>{

  load()

 },[])

 return(

  <div className="p-6">

   <h1 className="text-2xl font-semibold mb-4">
    Community Reliability Reports
   </h1>

   {reports.map((r,i)=>(
    
    <div key={i} className="p-3 border rounded mb-3">

     <div className="font-semibold">
      {r.component}
     </div>

     <div>Mileage: {r.mileage}</div>

     <div className="text-sm">
      Symptoms: {r.symptoms}
     </div>

    </div>

   ))}

  </div>

 )
}