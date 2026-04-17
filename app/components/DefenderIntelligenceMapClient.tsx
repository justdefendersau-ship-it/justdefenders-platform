/*
Timestamp: 5 March 2026 19:05
File: app/components/DefenderIntelligenceMapClient.tsx

Purpose
-------
Global Defender Intelligence Map

Fix
---
Ensures Leaflet map is destroyed before remounting.
Prevents the "Map container is already initialized" error.
*/

"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const MapContainer:any = dynamic(
  () => import("react-leaflet").then(m => m.MapContainer),
  { ssr:false }
)

const TileLayer:any = dynamic(
  () => import("react-leaflet").then(m => m.TileLayer),
  { ssr:false }
)

const Marker:any = dynamic(
  () => import("react-leaflet").then(m => m.Marker),
  { ssr:false }
)

const Popup:any = dynamic(
  () => import("react-leaflet").then(m => m.Popup),
  { ssr:false }
)

type MapPoint = {
  country:string
  region:string
  latitude:number
  longitude:number
  failure_event:string
  reliability_score:number
}

export default function DefenderIntelligenceMapClient(){

  const [points,setPoints] = useState<MapPoint[]>([])
  const [map,setMap] = useState<L.Map | null>(null)

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/global-map")

      if(!res.ok){
        console.error("Map API failed")
        return
      }

      const json = await res.json()

      setPoints(json)

    }

    load()

  },[])

  useEffect(()=>{

    return ()=>{

      if(map){
        map.remove()
      }

    }

  },[map])

  return(

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Global Defender Intelligence Map
      </h2>

      <div style={{height:"500px"}}>

        <MapContainer
          whenCreated={(m:any)=>setMap(m)}
          center={[20,0]}
          zoom={2}
          style={{height:"100%",width:"100%"}}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map((p,i)=>(
            <Marker
              key={i}
              position={[p.latitude,p.longitude]}
            >
              <Popup>

                <div>
                  <strong>{p.country}</strong>
                  <div>{p.region}</div>
                  <div>Failure: {p.failure_event}</div>
                  <div>Reliability: {p.reliability_score}</div>
                </div>

              </Popup>
            </Marker>
          ))}

        </MapContainer>

      </div>

    </div>

  )

}