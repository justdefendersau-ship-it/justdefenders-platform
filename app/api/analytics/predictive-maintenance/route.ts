/*
Timestamp: 8 March 2026 — 18:55
Predictive Maintenance API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   vin:"SALDW2FE0BA123456",
   component:"Turbocharger",
   window:"Next 2,000 km",
   priority:"Medium"
  },

  {
   vin:"SALDW2FE0BA987654",
   component:"EGR Valve",
   window:"Next 1,200 km",
   priority:"High"
  }

 ])

}