/*
Timestamp: 8 March 2026 — 23:05
Reliability Intelligence Command Simulator
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const scenario = body.scenario

 let result = "Simulation could not be completed."

 if(scenario === "turbo-delay"){

  result =
   "Delaying turbo replacement increases injector failure probability by 27%."

 }

 if(scenario === "supplier-change"){

  result =
   "Switching to supplier Bosch increases fleet reliability score by 4%."

 }

 if(scenario === "maintenance-delay"){

  result =
   "Delaying scheduled maintenance increases fleet failure risk by 18%."

 }

 return NextResponse.json({

  result

 })

}