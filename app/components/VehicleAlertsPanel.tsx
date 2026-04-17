/* Timestamp: 12 March 2026 22:02 */
/* Vehicle Alerts Panel */

"use client"

import { useEffect,useState } from "react"

export default function VehicleAlertsPanel(){

 const [alerts,setAlerts] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/member/alerts")
   const data = await res.json()

   setAlerts(data || [])

  }

  load()

 },[])

 return(

  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

   <div className="text-sm text-gray-400 mb-3">
    Vehicle Alerts
   </div>

   {alerts.length===0 && (
    <div className="text-xs text-gray-500">
     No alerts
    </div>
   )}

   {alerts.map((a)=>(
    <div
     key={a.id}
     className="text-sm text-red-400 mb-1"
    >
     {a.message}
    </div>
   ))}

  </div>

 )

}