/*
Timestamp: 9 March 2026 — 00:40
Parts Demand Forecasting Engine
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   part:"Turbocharger",
   forecastDemand:3,
   timeframe:"Next 2,000 km"
  },

  {
   part:"EGR Valve",
   forecastDemand:5,
   timeframe:"Next 3 months"
  },

  {
   part:"Fuel Injector",
   forecastDemand:2,
   timeframe:"Next 5,000 km"
  }

 ])

}