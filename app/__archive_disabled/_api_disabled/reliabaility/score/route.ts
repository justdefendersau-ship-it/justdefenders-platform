/*
Timestamp 9 March 2026 07:00
Defender Reliability Score Engine
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const mileage = body.mileage || 0
 const failures = body.failures || 0
 const overdueMaintenance = body.overdueMaintenance || 0

 let score = 100

 score -= failures * 10
 score -= overdueMaintenance * 5

 if(mileage > 200000){

  score -= 5

 }

 if(score < 0){

  score = 0

 }

 return NextResponse.json({

  reliabilityScore:score,
  maintenanceScore:100 - (overdueMaintenance*5),
  failureScore:100 - (failures*10)

 })

}