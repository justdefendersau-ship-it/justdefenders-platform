/*
Timestamp 9 March 2026 06:30
Maintenance Schedule Engine
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const mileage = body.mileage

 const schedule = [

  {
   service:"Engine Oil Service",
   interval:10000,
   part:"LR013148"
  },

  {
   service:"Fuel Filter Replacement",
   interval:20000,
   part:"LR009705"
  },

  {
   service:"Timing Belt Inspection",
   interval:100000,
   part:"LR016655"
  }

 ]

 const due = schedule.filter(s => mileage >= s.interval)

 return NextResponse.json(due)

}