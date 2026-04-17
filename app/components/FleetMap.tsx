"use client"

/*
JustDefenders ©
Fleet Intelligence Map

Restored stable GeoJSON animation system

File: app/components/FleetMap.tsx
Timestamp: 15 March 2026 16:24
*/

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"

interface RoutePoint {
  lat: number
  lng: number
}

interface FleetVehicle {
  id: string
  route: RoutePoint[]
}

interface FleetMapProps {
  vehicles: FleetVehicle[]
}

export default function FleetMap({ vehicles }: FleetMapProps) {

  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  function interpolate(start: RoutePoint, end: RoutePoint, steps: number) {

    const frames: RoutePoint[] = []

    for (let i = 0; i <= steps; i++) {

      const t = i / steps

      frames.push({
        lat: start.lat + (end.lat - start.lat) * t,
        lng: start.lng + (end.lng - start.lng) * t
      })

    }

    return frames
  }

  useEffect(() => {

    if (!mapContainer.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [151.21, -33.86],
      zoom: 11
    })

    mapRef.current = map

    map.on("load", () => {

      const img = new Image(64, 64)
      img.src = "/defender-marker.svg"

      img.onload = () => {

        if (!map.hasImage("defender-marker")) {
          map.addImage("defender-marker", img)
        }

        vehicles.forEach(vehicle => {

          const sourceId = `vehicle-${vehicle.id}`
          const layerId = `vehicle-layer-${vehicle.id}`

          const first = vehicle.route[0]

          map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [first.lng, first.lat]
                }
              }]
            }
          })

          map.addLayer({
            id: layerId,
            type: "symbol",
            source: sourceId,
            layout: {
              "icon-image": "defender-marker",
              "icon-size": 0.6,
              "icon-anchor": "center",
              "icon-allow-overlap": true
            }
          })

          let segment = 0

          function animateVehicle() {

            if (segment >= vehicle.route.length - 1) return

            const start = vehicle.route[segment]
            const end = vehicle.route[segment + 1]

            const frames = interpolate(start, end, 30)

            let frameIndex = 0

            function animateFrame() {

              if (frameIndex >= frames.length) {

                segment++
                animateVehicle()
                return

              }

              const p = frames[frameIndex]

              const source = map.getSource(sourceId) as maplibregl.GeoJSONSource

              if (source) {

                source.setData({
                  type: "FeatureCollection",
                  features: [{
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: [p.lng, p.lat]
                    }
                  }]
                })

              }

              frameIndex++

              requestAnimationFrame(animateFrame)

            }

            animateFrame()

          }

          setTimeout(animateVehicle, 500)

        })

      }

    })

    return () => map.remove()

  }, [vehicles])

  return (
    <div
      ref={mapContainer}
      className="w-full h-[600px] rounded-xl border border-neutral-800"
    />
  )
}