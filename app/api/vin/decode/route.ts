/*
Timestamp 9 March 2026 04:20
Fuel CSV Import API
*/

import { NextResponse } from "next/server"

let logs:any[] = []

export async function POST(request:Request){

 const form = await request.formData()

 const file = form.get("file") as File

 const text = await file.text()

 const rows = text.split("\n")

 rows.slice(1).forEach((row)=>{

  const [date,litres,odometer] = row.split(",")

  if(litres && odometer){

   logs.push({
    date,
    litres,
    odometer
   })

  }

 })

 return NextResponse.json({
  status:"imported"
 })

}