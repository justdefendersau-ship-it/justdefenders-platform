// TripRouteMap.tsx
// Timestamp: 10 March 2026 17:26
// Commentary:
// Displays GPX route using MapLibre.

"use client"

import Map from "react-map-gl/maplibre"
import { useEffect,useState } from "react"

export default function TripRouteMap({gpxUrl}:{gpxUrl:string}){

 const [geojson,setGeojson] = useState<any>(null)

 useEffect(()=>{

  fetch(gpxUrl)
   .then(res=>res.text())
   .then(text=>{

    const parser = new DOMParser()
    const xml = parser.parseFromString(text,"text/xml")

    const points = Array.from(
     xml.getElementsByTagName("trkpt")
    ).map((p:any)=>({

     type:"Feature",
     geometry:{
      type:"Point",
      coordinates:[
       Number(p.getAttribute("lon")),
       Number(p.getAttribute("lat"))
      ]
     }

    }))

    setGeojson({

     type:"FeatureCollection",
     features:points

    })

   })

 },[gpxUrl])


 return(

  <div className="h-[500px]">

   <Map
    initialViewState={{
     latitude:-25,
     longitude:133,
     zoom:4
    }}
    mapStyle="https://demotiles.maplibre.org/style.json"
   />

  </div>

 )
}