/*
Timestamp 9 March 2026 03:25
Member Add Vehicle API
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const vehicle = {

  vin:body.vin,
  model:body.model,
  year:body.year

 }

 return NextResponse.json({
  status:"saved",
  vehicle
 })

}