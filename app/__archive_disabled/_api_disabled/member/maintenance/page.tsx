/*
Timestamp 9 March 2026 03:25
Member Vehicles API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   vin:"SALDW2FE0BA123456",
   model:"Defender 110",
   year:2012
  }

 ])

}