/*
Timestamp: 8 March 2026 — 23:30
Fleet Digital Twin Universe API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   vin:"SALDW2FE0BA123456",
   healthScore:92,
   riskLevel:"low",
   predictedFailure:"None"
  },

  {
   vin:"SALDW2FE0BA987654",
   healthScore:81,
   riskLevel:"medium",
   predictedFailure:"EGR Valve"
  },

  {
   vin:"SALDW2FE0BA555555",
   healthScore:74,
   riskLevel:"high",
   predictedFailure:"Turbocharger"
  }

 ])

}