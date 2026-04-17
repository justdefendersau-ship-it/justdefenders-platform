// route.ts
// Timestamp: 10 March 2026 21:05
// Commentary:
// API endpoint allowing mobile clients to upload recorded trips.

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const trip = {

  startTime: body.startTime,
  endTime: body.endTime,
  distance: body.distance,
  routePoints: body.routePoints

 }

 return NextResponse.json({
  success:true,
  trip
 })

}