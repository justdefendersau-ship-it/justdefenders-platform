// route.ts
// Timestamp: 10 March 2026 20:35
// Commentary:
// API endpoint allowing mobile clients to log fuel entries.

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const entry = {

  litres: body.litres,
  price: body.price,
  odometer: body.odometer,
  station: body.station,
  date: new Date().toISOString()

 }

 // In the next step this will insert into Supabase
 // For now we simply return the entry to confirm the API works

 return NextResponse.json({
  success:true,
  entry
 })

}