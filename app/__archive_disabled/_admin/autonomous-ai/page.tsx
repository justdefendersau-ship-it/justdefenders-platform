"use client"

// Timestamp 7 March 2026 00:05
// File: /app/admin/autonomous-ai/page.tsx

import { useEffect,useState } from "react"

export default function AutonomousAI(){

 const [logs,setLogs] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/admin/autonomous-activity")
  .then(r=>r.json())
  .then(d=>setLogs(d.activity))

 },[])

 return(

 <div className="p-10 space-y-6">

  <h1 className="text-3xl font-bold">
  Autonomous Reliability AI
  </h1>

  {logs.map((l,i)=>(

   <div key={i} className="border-b py-3">

    <div>Task: {l.task}</div>
    <div>Status: {l.status}</div>
    <div>{l.details}</div>

   </div>

  ))}

 </div>

 )

}