"use client"

// Timestamp 6 March 2026 21:10
// File: /app/alerts/page.tsx

import { useEffect, useState } from "react"

export default function AlertsPage(){

 const [alerts,setAlerts] = useState<any[]>([])

 useEffect(()=>{

   fetch("/api/alerts/list")
   .then(r=>r.json())
   .then(d=>setAlerts(d.alerts))

 },[])

 return (

   <div className="p-10 space-y-6">

     <h1 className="text-3xl font-bold">

       Reliability Alerts

     </h1>

     {alerts.map((a,i)=>(

       <div key={i} className="border-b py-3">

         <div>Type: {a.alert_type}</div>
         <div>Entity: {a.entity_id}</div>
         <div>Severity: {a.severity}</div>
         <div>{a.message}</div>

       </div>

     ))}

   </div>

 )

}