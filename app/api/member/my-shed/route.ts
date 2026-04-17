/*
Timestamp 9 March 2026 03:55
My Shed API
*/

import { NextResponse } from "next/server"

let parts:any[] = []

export async function GET(){

 return NextResponse.json(parts)

}

export async function POST(request:Request){

 const body = await request.json()

 parts.push({

  part:body.part

 })

 return NextResponse.json({
  status:"saved"
 })

}