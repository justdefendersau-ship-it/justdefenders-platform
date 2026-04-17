"use client"

/*
=====================================================
SUPPLIER MAP VISUALISATION
Timestamp: 28 Feb 2026 10:05
=====================================================
*/

import { useEffect } from "react"

export default function SupplierMap({
  suppliers
}: any) {

  useEffect(() => {

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {

      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 6,
          center: { lat: -33.8688, lng: 151.2093 }
        }
      )

      suppliers.forEach((s: any) => {
        if (!s.latitude || !s.longitude) return

        new google.maps.Marker({
          position: {
            lat: s.latitude,
            lng: s.longitude
          },
          map,
          title: s.name
        })
      })
    }

  }, [suppliers])

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px" }}
    />
  )
}