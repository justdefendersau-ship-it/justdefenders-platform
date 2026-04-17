/*
Timestamp 9 March 2026 08:10
Defender Global Intelligence Map API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json({

  fuelStops:[
   {
    lat:-33.8688,
    lng:151.2093,
    station:"BP Sydney"
   }
  ],

  failures:[
   {
    lat:51.5074,
    lng:-0.1278,
    component:"EGR Valve"
   }
  ],

  suppliers:[
   {
    lat:48.8566,
    lng:2.3522,
    name:"Bosch Supplier"
   }
  ],

  trips:[
   {
    lat:-31.9523,
    lng:115.8613,
    location:"Perth Trip Stop"
   }
  ]

 })

}