"use client"

/*
Vehicle Telemetry Dashboard Panel
Timestamp: 14 March 2026 01:45
Displays live vehicle health data
*/

import { useEffect,useState } from "react"

export default function VehicleTelemetryPanel({ vin }:{ vin:string }){

const [telemetry,setTelemetry] = useState<any>(null)

async function load(){

const res = await fetch(`/api/telemetry/latest/${vin}`)
const json = await res.json()

setTelemetry(json)

}

useEffect(()=>{

load()

const interval = setInterval(load,10000)

return ()=>clearInterval(interval)

},[vin])

if(!telemetry){

return(

<div className="bg-gray-900 p-6 rounded-xl">
Loading telemetry...
</div>

)

}

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Vehicle Health
</h2>

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Coolant Temp
</div>
<div className="text-2xl font-bold">
{telemetry.coolant_temp ?? "--"} °C
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Battery Voltage
</div>
<div className="text-2xl font-bold">
{telemetry.battery_voltage ?? "--"} V
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Fuel Level
</div>
<div className="text-2xl font-bold">
{telemetry.fuel_level ?? "--"} %
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Engine RPM
</div>
<div className="text-2xl font-bold">
{telemetry.rpm ?? "--"}
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Vehicle Speed
</div>
<div className="text-2xl font-bold">
{telemetry.speed ?? "--"} km/h
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Last Update
</div>
<div className="text-sm">
{new Date(telemetry.timestamp).toLocaleString()}
</div>
</div>

</div>

</div>

)

}