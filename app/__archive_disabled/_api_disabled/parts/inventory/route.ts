/*
Timestamp: 9 March 2026 — 01:05
Smart Inventory System API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   part:"Turbocharger",
   stock:1,
   reorderLevel:2
  },

  {
   part:"EGR Valve",
   stock:4,
   reorderLevel:3
  },

  {
   part:"Fuel Injector",
   stock:2,
   reorderLevel:2
  }

 ])

}