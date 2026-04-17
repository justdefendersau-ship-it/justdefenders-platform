/*
Timestamp: 8 March 2026 — 23:55
VIN-Aware Parts Search Engine API
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const vin = body.vin

 const parts = [

  {
   part:"Turbocharger",
   oem:"LR056369",
   supplier:"BorgWarner",
   reliabilityScore:93
  },

  {
   part:"EGR Valve",
   oem:"LR018323",
   supplier:"Bosch",
   reliabilityScore:91
  },

  {
   part:"Fuel Injector",
   oem:"LR013075",
   supplier:"Bosch",
   reliabilityScore:94
  }

 ]

 return NextResponse.json({
  vin,
  parts
 })

}