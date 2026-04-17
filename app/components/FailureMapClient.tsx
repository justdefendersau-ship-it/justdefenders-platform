// ------------------------------------------------------
// File: app/components/FailureMapClient.tsx
// Timestamp: 18 March 2026 04:48
// JustDefenders ©
//
// Client-side Leaflet Failure Map
// ------------------------------------------------------

"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

type Failure = {
  vin: string
  component: string
  failure_type: string
  latitude: number
  longitude: number
  report_date: string
}

export default function FailureMapClient() {

  const [failures, setFailures] = useState<Failure[]>([])

  useEffect(() => {

    async function loadFailures() {

      const res = await fetch("/api/failure-map")
      const data = await res.json()

      setFailures(data)

    }

    loadFailures()

  }, [])

  return (

    <MapContainer
      center={[0,20]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >

      <TileLayer
        url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY"
        attribution="© MapTiler © OpenStreetMap contributors"
      />

      {failures.map((f,i)=>(
        <Marker key={i} position={[f.latitude, f.longitude]}>
          <Popup>
            <strong>{f.component}</strong>
            <br/>
            {f.failure_type}
            <br/>
            VIN: {f.vin}
          </Popup>
        </Marker>
      ))}

    </MapContainer>

  )

}