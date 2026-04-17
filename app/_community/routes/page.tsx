// page.tsx
// Timestamp: 10 March 2026 18:10
// Commentary:
// Displays all shared expedition routes on a map.

"use client"

import { useEffect,useState } from "react"
import Map,{ Marker } from "react-map-gl/maplibre"

export default function CommunityRoutes(){

 const [routes,setRoutes] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/community/routes")
   .then(res=>res.json())
   .then(setRoutes)

 },[])

 return(

  <div className="p-6">

   <h1 className="text-2xl font-bold mb-4">
    Community Routes
   </h1>

   <div className="h-[600px]">

    <Map
     initialViewState={{
      latitude:-25,
      longitude:133,
      zoom:4
     }}
     mapStyle="https://demotiles.maplibre.org/style.json"
    >

     {routes.map(r=>(

      <Marker
       key={r.id}
       longitude={r.longitude}
       latitude={r.latitude}
      >

       <div
        className="bg-orange-600 text-white text-xs px-2 py-1 rounded"
        title={r.title}
       >
        🗺
       </div>

      </Marker>

     ))}

    </Map>

   </div>

  </div>

 )
}