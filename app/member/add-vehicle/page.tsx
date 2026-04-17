/*
Timestamp 9 March 2026 04:20
VIN Decoder API
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const vin = body.vin

 let result:any = {}

 if(vin.startsWith("SAL")){

  result = {

   vin,
   manufacturer:"Land Rover",
   model:"Defender",
   engine:"2.2 TDCi",
   year:2012

  }

 }

 return NextResponse.json(result)

}