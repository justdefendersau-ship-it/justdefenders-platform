// page.tsx
// Timestamp: 10 March 2026 11:18
// Commentary:
// Displays global fuel map using MapLibre.

"use client"

import { useEffect,useState } from "react"
import Map,{ Marker } from "react-map-gl/maplibre"

export default function FuelMapPage(){

 const [stations,setStations] = useState<any[]>([])

 const MAP_STYLE =
 `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`


 useEffect(()=>{

  fetch("/api/member/fuel/map")
   .then(res=>res.json())
   .then(setStations)

 },[])


 return(

  <div className="p-6 space-y-6">

   <h1 className="text-2xl font-bold">
    Defender Fuel Map
   </h1>

   <div className="h-[500px] rounded overflow-hidden">

    <Map
     initialViewState={{
      longitude:133,
      latitude:-25,
      zoom:4
     }}
     mapStyle={MAP_STYLE}
    >

     {stations.map((s,i)=>{

      if(!s.latitude || !s.longitude) return null

      return(

       <Marker
        key={i}
        longitude={s.longitude}
        latitude={s.latitude}
       >

        <div
         className="bg-green-600 text-white text-xs px-2 py-1 rounded cursor-pointer"
         title={`${s.station} $${s.price}`}
        >

         ⛽

        </div>

       </Marker>

      )

     })}

    </Map>

   </div>

  </div>

 )
}