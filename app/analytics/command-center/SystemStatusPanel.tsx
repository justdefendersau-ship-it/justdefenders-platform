// SystemStatusPanel.tsx
// Timestamp: 10 March 2026 11:40
// Commentary:
// Displays platform operational status.

"use client"

import { useEffect,useState } from "react"

export default function SystemStatusPanel(){

 const [status,setStatus] = useState<any>(null)

 useEffect(()=>{

  fetch("/api/admin/system-status")
   .then(res=>res.json())
   .then(setStatus)

 },[])

 if(!status){
  return <div>Loading system status...</div>
 }

 return(

  <div>

   <h2 className="font-bold text-lg mb-2">
    System Status
   </h2>

   <div>Platform: {status.platform}</div>
   <div>Harvester: {status.harvester}</div>
   <div>Intelligence Engines: {status.engines}</div>
   <div>Database: {status.database}</div>

  </div>

 )

}