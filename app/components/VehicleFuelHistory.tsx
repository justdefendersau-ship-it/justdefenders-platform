"use client"

/*
Vehicle Fuel History Panel
Timestamp: 13 March 2026 18:47
Displays fuel logs for vehicle
*/

import { useEffect,useState } from "react"

interface FuelLog{

date:string
litres:number
total_cost:number
odometer:number

}

export default function VehicleFuelHistory({vin}:{vin:string}){

const [logs,setLogs] = useState<FuelLog[]>([])

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/${vin}/fuel`)
const json = await res.json()

setLogs(json)

}

load()

},[vin])

return(

<div className="bg-gray-900 text-white p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Fuel History
</h2>

<table className="w-full text-sm">

<thead className="text-gray-400">

<tr>

<th className="text-left pb-2">
Date
</th>

<th className="text-left pb-2">
Litres
</th>

<th className="text-left pb-2">
Cost
</th>

<th className="text-left pb-2">
Odometer
</th>

</tr>

</thead>

<tbody>

{logs.map((log,i)=>(

<tr
key={i}
className="border-t border-gray-800"
>

<td className="py-2">

{new Date(log.date).toLocaleDateString()}

</td>

<td>

{log.litres} L

</td>

<td>

${log.total_cost}

</td>

<td>

{log.odometer.toLocaleString()} km

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}