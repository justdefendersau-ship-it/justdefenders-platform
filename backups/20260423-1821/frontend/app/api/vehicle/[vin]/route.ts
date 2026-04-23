//
// Timestamp: 17 April 2026 13:50
// JustDefenders ©
// File: /app/api/vehicle/[vin]/route.ts
//

import { NextResponse } from 'next/server'

export async function GET(request, { params }) {

  const vin = params.vin

  console.log("🧠 Intelligence API HIT:", vin)

  return NextResponse.json({
    vin: vin,

    // ------------------------------------------------------------------
    // 🧠 SCORING MODEL (NOW AUTHORITATIVE)
    // ------------------------------------------------------------------

    scoring: {
      reliability_weight: 0.3,
      price_weight: 0.4,
      delivery_weight: 0.3
    },

    // ------------------------------------------------------------------
    // FUTURE EXTENSIONS
    // ------------------------------------------------------------------

    vehicle: {
      detected: true,
      confidence: 0.6
    },

    insights: [],

    status: "fallback_active"
  })
}