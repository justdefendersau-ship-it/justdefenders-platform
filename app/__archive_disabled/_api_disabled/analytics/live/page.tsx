"use client"

import { useEffect,useState } from "react"
import LiveFleetMap from "@/app/components/LiveFleetMap"

export default function LiveTelemetryDashboard(){

const [events,setEvents] = useState<any[]>([])

useEffect(()=>{

fetch("/api/analytics/live-telemetry")
.then(r=>r.json())
.then(setEvents)

},[])

return(

<div className="p-8 space-y-6">

<h1 className="text-3xl font-bold">
Real-Time Fleet Telemetry
</h1>

<LiveFleetMap/>

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-semibold mb-4">
Recent Telemetry Events
</h2>

<table className="text-sm w-full">

<thead>

<tr className="text-left border-b">

<th>VIN</th>
<th>Temp</th>
<th>Load</th>
<th>Odometer</th>

</tr>

</thead>

<tbody>

{events.map((e,i)=>(

<tr key={i} className="border-b">

<td>{e.vin}</td>
<td>{Math.round(e.engine_temp)}°C</td>
<td>{Math.round(e.engine_load)}%</td>
<td>{Math.round(e.odometer)} km</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}