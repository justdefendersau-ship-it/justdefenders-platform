"use client"

/*
Predictive Maintenance Alerts Panel
Timestamp: 14 March 2026 02:26
Displays AI maintenance alerts
*/

import { useEffect,useState } from "react"

export default function PredictiveAlertsPanel({ vin }:{ vin:string }){

const [alerts,setAlerts] = useState<any[]>([])

useEffect(()=>{

async function load(){

const res = await fetch(`/api/predictive-alerts/${vin}`)
const json = await res.json()

setAlerts(json)

}

load()

},[vin])

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Predictive Maintenance Alerts
</h2>

{alerts.length === 0 && (

<div className="text-gray-400">
No predictive alerts detected
</div>

)}

{alerts.map((alert,i)=>(

<div
key={i}
className="bg-gray-800 p-4 rounded mb-3"
>

<div className="font-bold">

{alert.severity === "critical" && "🔴 "}
{alert.severity === "warning" && "🟡 "}

{alert.message}

</div>

</div>

))}

</div>

)

}