/*
Timestamp: 7 March 2026 — 20:38
File: /app/components/GlobalReliabilityHeatmap.tsx

Purpose:
Render global Defender reliability heatmap
showing fleet risk concentration.
*/

"use client"

import { useEffect,useRef,useState } from "react"
import maplibregl from "maplibre-gl"

interface HeatPoint{

 lat:number
 lng:number
 risk_score:number
 vehicle_count:number

}

export default function GlobalReliabilityHeatmap(){

 const mapContainer = useRef<HTMLDivElement | null>(null)
 const map = useRef<maplibregl.Map | null>(null)

 const [points,setPoints] = useState<HeatPoint[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/global-reliability-heatmap")
   const data = await res.json()

   if(Array.isArray(data)){
    setPoints(data)
   }

  }

  load()

 },[])

 useEffect(()=>{

  if(!mapContainer.current || map.current) return

  map.current = new maplibregl.Map({

   container: mapContainer.current,
   style: "https://demotiles.maplibre.org/style.json",
   center: [0,20],
   zoom: 1.6

  })

  map.current.on("load",()=>{

   const geojson = {

    type:"FeatureCollection",
    features: points.map(p=>({

     type:"Feature",

     geometry:{
      type:"Point",
      coordinates:[p.lng,p.lat]
     },

     properties:{
      risk:p.risk_score
     }

    }))

   }

   map.current?.addSource("heatmap-data",{

    type:"geojson",
    data:geojson

   })

   map.current?.addLayer({

    id:"heatmap",

    type:"heatmap",

    source:"heatmap-data",

    paint:{

     "heatmap-weight":[
      "interpolate",
      ["linear"],
      ["get","risk"],
      0,0,
      100,1
     ],

     "heatmap-intensity":1.2,

     "heatmap-radius":30

    }

   })

  })

 },[points])

 return(

 <div className="bg-slate-900 rounded-xl border border-neutral-800">

  <div className="p-6 font-semibold text-lg">
   Global Defender Reliability Heatmap
  </div>

  <div
   ref={mapContainer}
   className="w-full h-[420px]"
  />

 </div>

 )

}