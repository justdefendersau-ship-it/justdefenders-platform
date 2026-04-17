/*
Timestamp 9 March 2026 09:40
Realtime Member Location Update API
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const location = {

  user_id:body.user_id,
  trip_id:body.trip_id,

  latitude:body.latitude,
  longitude:body.longitude,
  altitude:body.altitude,

  speed:body.speed,
  heading:body.heading,
  accuracy:body.accuracy

 }

 return NextResponse.json({
  status:"location_updated",
  location
 })

}