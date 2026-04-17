/*
Timestamp 9 March 2026 03:55
Maintenance API
*/

import { NextResponse } from "next/server"

let records:any[] = []

export async function GET(){

 return NextResponse.json(records)

}

export async function POST(request:Request){

 const body = await request.json()

 const record = {

  service:body.service,
  mileage:body.mileage

 }

 records.push(record)

 return NextResponse.json({
  status:"saved"
 })

}