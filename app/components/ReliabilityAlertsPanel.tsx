/*
Timestamp: 8 March 2026 — 22:29
File: /app/components/ReliabilityAlertsPanel.tsx

Purpose:
Display real-time fleet reliability alerts.

Fix:
Validate API responses so alerts.map()
never executes on non-array values.
*/

"use client"

import { useEffect, useState } from "react"

interface Alert {

 id: number
 vin: string
 alert_type: string
 message: string
 severity: string
 created_at: string

}

export default function ReliabilityAlertsPanel(){

 const [alerts,setAlerts] = useState<Alert[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/reliability-alerts")
    const data = await res.json()

    if(Array.isArray(data)){
     setAlerts(data)
    }else{
     console.error("Invalid alerts response:",data)
     setAlerts([])
    }

   }catch(err){

    console.error("Alerts fetch error:",err)
    setAlerts([])

   }finally{

    setLoading(false)

   }

  }

  load()

 },[])

 return(

 <div className="bg-slate-900 rounded-xl p-6 border border-neutral-800">

  <h2 className="text-xl font-semibold mb-4">
   Real-Time Reliability Alerts
  </h2>

  <div className="space-y-3">

   {loading && (
    <div className=" text-neutral-400 text-sm">
     Loading alerts...
    </div>
   )}

   {!loading && alerts.length === 0 && (
    <div className=" text-neutral-400 text-sm">
     No active alerts
    </div>
   )}

   {alerts.map((alert)=>{

    const severityColor =
     alert.severity === "critical"
      ? "text-red-400"
      : alert.severity === "warning"
      ? "text-yellow-400"
      : "text-blue-400"

    return(

     <div
      key={alert.id}
      className="bg-slate-800 rounded-lg p-4 flex justify-between items-start"
     >

      <div>

       <div className="font-mono text-xs  text-neutral-400">
        VIN {alert.vin}
       </div>

       <div className="text-white font-semibold">
        {alert.message}
       </div>

       <div className="text-xs  text-neutral-500">
        {new Date(alert.created_at).toLocaleString()}
       </div>

      </div>

      <div className={`text-sm font-semibold ${severityColor}`}>
       {alert.severity.toUpperCase()}
      </div>

     </div>

    )

   })}

  </div>

 </div>

 )

}