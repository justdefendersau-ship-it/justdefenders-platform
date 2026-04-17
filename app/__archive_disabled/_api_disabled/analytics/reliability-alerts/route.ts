/*
Timestamp: 8 March 2026 — 19:30
Reliability Alerts API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   type:"AI Prediction",
   message:"Turbocharger failure likely within 2,000 km (VIN SALDW2FE0BA123456)",
   severity:"warning"
  },

  {
   type:"Supplier Alert",
   message:"Increased EGR valve failures detected in fleet",
   severity:"warning"
  }

 ])

}