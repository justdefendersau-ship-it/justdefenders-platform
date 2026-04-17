"use client"

/*
Timestamp 9 March 2026 08:10
Defender Global Intelligence Map
*/

import { useEffect } from "react"
import maplibregl from "maplibre-gl"

export default function DefenderGlobalIntelligenceMap(){

 useEffect(()=>{

  const map = new maplibregl.Map({

   container:"global-intelligence-map",
   style:"https://demotiles.maplibre.org/style.json",
   center:[0,20],
   zoom:1.5

  })

  loadData(map)

 },[])

 async function loadData(map:any){

  const res = await fetch("/api/analytics/intelligence-map")

  const data = await res.json()

  data.fuelStops.forEach((f:any)=>{

   new maplibregl.Marker({color:"green"})
    .setLngLat([f.lng,f.lat])
    .setPopup(
     new maplibregl.Popup().setText(`Fuel Stop: ${f.station}`)
    )
    .addTo(map)

  })

  data.failures.forEach((f:any)=>{

   new maplibregl.Marker({color:"red"})
    .setLngLat([f.lng,f.lat])
    .setPopup(
     new maplibregl.Popup().setText(`Failure: ${f.component}`)
    )
    .addTo(map)

  })

  data.suppliers.forEach((s:any)=>{

   new maplibregl.Marker({color:"blue"})
    .setLngLat([s.lng,s.lat])
    .setPopup(
     new maplibregl.Popup().setText(`Supplier: ${s.name}`)
    )
    .addTo(map)

  })

  data.trips.forEach((t:any)=>{

   new maplibregl.Marker({color:"orange"})
    .setLngLat([t.lng,t.lat])
    .setPopup(
     new maplibregl.Popup().setText(`Trip Stop: ${t.location}`)
    )
    .addTo(map)

  })

 }

 return(

  <div
   id="global-intelligence-map"
   style={{height:"600px"}}
  />

 )
}