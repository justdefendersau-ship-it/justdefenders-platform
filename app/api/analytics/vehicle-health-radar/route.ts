/*
Timestamp: 8 March 2026 — 18:25
Vehicle Health Radar API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {system:"Engine",score:92},
  {system:"Transmission",score:88},
  {system:"Electrical",score:95},
  {system:"Cooling",score:90},
  {system:"Fuel",score:87},
  {system:"Drivetrain",score:91}

 ])

}