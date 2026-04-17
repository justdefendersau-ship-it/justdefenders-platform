"use client"

/*
Fuel Map Visualisation
Timestamp: 14 March 2026 00:44
Displays fuel events on map
*/

import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet"
import { useEffect,useState } from "react"
import "leaflet/dist/leaflet.css"

interface FuelEvent{

latitude:number
longitude:number
litres:number
date:string
fuel_station:string

}

export default function FuelMap({vin}:{vin:string}){

const [events,setEvents] = useState<FuelEvent[]>([])

useEffect(()=>{

async function load(){

const res = await fetch(`/api/fuel/map/${vin}`)
const json = await res.json()

setEvents(json)

}

load()

},[vin])

if(events.length === 0){

return(

<div className="bg-gray-900 p-6 rounded-xl">
No fuel events with location yet
</div>

)

}

const center:[number,number] = [
events[0].latitude,
events[0].longitude
]

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Fuel Map
</h2>

<MapContainer
center={center}
zoom={6}
style={{ height:"400px" }}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{events.map((e,i)=>(

<Marker
key={i}
position={[e.latitude,e.longitude]}
>

<Popup>

Fuel Stop

<br/>

Litres: {e.litres}

<br/>

Date: {e.date}

<br/>

Station: {e.fuel_station || "Unknown"}

</Popup>

</Marker>

))}

</MapContainer>

</div>

)

}