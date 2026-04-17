"use client"

/*
Vehicle Trips History Panel
Timestamp: 13 March 2026 19:17
Displays trips for vehicle
*/

import { useEffect,useState } from "react"

interface Trip{

date:string
name:string
distance_km:number
duration:string

}

export default function VehicleTripsHistory({vin}:{vin:string}){

const [trips,setTrips] = useState<Trip[]>([])

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/${vin}/trips`)
const json = await res.json()

setTrips(json)

}

load()

},[vin])

return(

<div className="bg-gray-900 text-white p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Trips
</h2>

<table className="w-full text-sm">

<thead className="text-gray-400">

<tr>

<th className="text-left pb-2">
Trip
</th>

<th className="text-left pb-2">
Date
</th>

<th className="text-left pb-2">
Distance
</th>

<th className="text-left pb-2">
Duration
</th>

</tr>

</thead>

<tbody>

{trips.map((trip,i)=>(

<tr
key={i}
className="border-t border-gray-800"
>

<td className="py-2">

{trip.name}

</td>

<td>

{new Date(trip.date).toLocaleDateString()}

</td>

<td>

{trip.distance_km} km

</td>

<td>

{trip.duration}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}