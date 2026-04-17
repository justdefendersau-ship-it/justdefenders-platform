/*
Timestamp 9 March 2026 06:00
Community Reliability Reports API
*/

import { NextResponse } from "next/server"

let reports:any[] = []

export async function GET(){

 return NextResponse.json(reports)

}

export async function POST(request:Request){

 const body = await request.json()

 const report = {

  vin:body.vin,
  component:body.component,
  mileage:body.mileage,
  symptoms:body.symptoms,
  repair:body.repair

 }

 reports.push(report)

 return NextResponse.json({
  status:"report_submitted"
 })

}