"use client"

/*
Vehicle Maintenance History Panel
Timestamp: 13 March 2026 19:03
Displays maintenance records
*/

import { useEffect,useState } from "react"

interface Maintenance{

date:string
description:string
cost:number
odometer:number

}

export default function VehicleMaintenanceHistory({vin}:{vin:string}){

const [records,setRecords] = useState<Maintenance[]>([])

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/${vin}/maintenance`)
const json = await res.json()

setRecords(json)

}

load()

},[vin])

return(

<div className="bg-gray-900 text-white p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Maintenance History
</h2>

<table className="w-full text-sm">

<thead className="text-gray-400">

<tr>

<th className="text-left pb-2">
Date
</th>

<th className="text-left pb-2">
Service
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

{records.map((r,i)=>(

<tr
key={i}
className="border-t border-gray-800"
>

<td className="py-2">

{new Date(r.date).toLocaleDateString()}

</td>

<td>

{r.description}

</td>

<td>

${r.cost}

</td>

<td>

{r.odometer.toLocaleString()} km

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}