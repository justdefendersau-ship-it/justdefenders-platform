/*
Timestamp 9 March 2026 07:35
Global Defender Reliability Map API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   component:"EGR Valve",
   lat:-33.8688,
   lng:151.2093,
   country:"Australia"
  },

  {
   component:"Turbocharger",
   lat:51.5074,
   lng:-0.1278,
   country:"UK"
  },

  {
   component:"Clutch Slave Cylinder",
   lat:40.7128,
   lng:-74.0060,
   country:"USA"
  }

 ])

}