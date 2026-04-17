// ------------------------------------------------------
// File: app/failure-map/page.tsx
// Timestamp: 18 March 2026 08:22
// JustDefenders ©
//
// Global Defender Failure Map
// Includes full intelligence layer
// ------------------------------------------------------

"use client"

import "../lib/leaflet-icon-fix"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.heat"

type Failure = {
  vin: string
  component: string
  failure_type: string
  latitude: number
  longitude: number
  report_date: string
}

type Intelligence = {
  total_failures: number
  top_components: { component: string; count: number }[]
}

const COMPONENTS = ["Engine", "Turbo", "Cooling", "Suspension", "Fuel"]

export default function FailureMapPage() {

  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  const [failures, setFailures] = useState<Failure[]>([])
  const [intelligence, setIntelligence] = useState<Intelligence | null>(null)

  const [activeFilters, setActiveFilters] = useState<string[]>(COMPONENTS)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [mapMode, setMapMode] = useState<"topo" | "satellite">("topo")

  // Load failures
  useEffect(() => {

    fetch("/api/failure-map")
      .then(res => res.json())
      .then(setFailures)

  }, [])

  // Load intelligence
  useEffect(() => {

    fetch("/api/reliability-intelligence")
      .then(res => res.json())
      .then(setIntelligence)

  }, [])

  // Init map
  useEffect(() => {

    if (mapRef.current || !mapContainerRef.current) return

    const map = L.map(mapContainerRef.current).setView([-25.2744, 133.7751], 5)

    mapRef.current = map

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 6)
      })
    }

  }, [])

  // Base layer
  useEffect(() => {

    if (!mapRef.current) return

    const map = mapRef.current

    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) map.removeLayer(layer)
    })

    const url =
      mapMode === "topo"
        ? "https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=SuGyGNIayhqc8myi3vbz"
        : "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=SuGyGNIayhqc8myi3vbz"

    L.tileLayer(url).addTo(map)

  }, [mapMode])

  function toggleFilter(component: string) {
    setActiveFilters(prev =>
      prev.includes(component)
        ? prev.filter(c => c !== component)
        : [...prev, component]
    )
  }

  // Update overlays
  useEffect(() => {

    if (!mapRef.current) return

    const map = mapRef.current

    map.eachLayer((layer: any) => {
      if (!(layer instanceof L.TileLayer)) map.removeLayer(layer)
    })

    const filtered = failures.filter(f =>
      activeFilters.some(filter =>
        f.component.toLowerCase().includes(filter.toLowerCase())
      )
    )

    if (showHeatmap) {

      const points = filtered.map(f => [f.latitude, f.longitude, 1])

      const heat = (L as any).heatLayer(points)
      heat.addTo(map)

    } else {

      const cluster = L.markerClusterGroup()

      filtered.forEach(f => {

        const marker = L.marker([f.latitude, f.longitude])

       marker.bindPopup(`
  <strong>${f.component}</strong><br/>
  ${f.failure_type}<br/><br/>
  <a href="/parts?component=${encodeURIComponent(f.component)}" style="color: #4ade80;">
    View Recommended Parts →
  </a>
`)

        cluster.addLayer(marker)

      })

      map.addLayer(cluster)

    }

  }, [failures, activeFilters, showHeatmap])

  return (

    <div style={{ height: "100vh", width: "100%", position: "relative" }}>

      {/* Control Panel */}
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
        background: "#111",
        padding: "12px",
        borderRadius: "8px",
        color: "white",
        maxWidth: "260px"
      }}>

        <strong>Filters</strong>

        {COMPONENTS.map(c => (
          <div key={c}>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.includes(c)}
                onChange={() => toggleFilter(c)}
              />
              {" "}{c}
            </label>
          </div>
        ))}

        <hr />

        <label>
          <input
            type="checkbox"
            checked={showHeatmap}
            onChange={() => setShowHeatmap(!showHeatmap)}
          />
          {" "}Heatmap
        </label>

        <hr />

        <strong>Map</strong>

        <div>
          <label>
            <input
              type="radio"
              checked={mapMode === "topo"}
              onChange={() => setMapMode("topo")}
            />
            {" "}Topo
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              checked={mapMode === "satellite"}
              onChange={() => setMapMode("satellite")}
            />
            {" "}Satellite
          </label>
        </div>

        <hr />

        <strong>Reliability Insights</strong>

        {intelligence && (
          <>
            <div>Total Failures: {intelligence.total_failures}</div>

            {intelligence.top_components.map((c, i) => (
              <div key={i}>
                {c.component}: {c.count}
              </div>
            ))}
          </>
        )}

      </div>

      <div
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%" }}
      />

    </div>

  )

}