/*
Timestamp 9 March 2026 03:55
Fuel API
*/

import { NextResponse } from "next/server"

let logs:any[] = []

export async function GET(){

 return NextResponse.json(logs)

}

export async function POST(request:Request){

 const body = await request.json()

 logs.push({

  litres:body.litres,
  odometer:body.odometer

 })

 return NextResponse.json({
  status:"saved"
 })

}