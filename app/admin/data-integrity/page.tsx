"use client"

// Timestamp 6 March 2026 20:50
// File: /app/admin/data-integrity/page.tsx

import { useEffect, useState } from "react"

export default function DataIntegrityPage(){

 const [issues,setIssues] = useState<any[]>([])

 useEffect(()=>{

   fetch("/api/admin/integrity-events")
   .then(r=>r.json())
   .then(d=>setIssues(d.events))

 },[])

 return (

   <div className="p-10 space-y-6">

     <h1 className="text-3xl font-bold">

       Data Integrity Monitor

     </h1>

     {issues.map((i,index)=>(

       <div key={index} className="border-b py-3">

         <div>Entity: {i.entity_type}</div>
         <div>ID: {i.entity_id}</div>
         <div>Issue: {i.issue_type}</div>
         <div>Severity: {i.severity}</div>

       </div>

     ))}

   </div>

 )

}