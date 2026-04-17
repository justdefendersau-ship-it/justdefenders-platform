// ------------------------------------------------------
// File: app/lib/leaflet-icon-fix.ts
// Timestamp: 18 March 2026 05:20
// JustDefenders ©
//
// Fix for Leaflet marker icons in Next.js
// ------------------------------------------------------

import L from "leaflet"

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})