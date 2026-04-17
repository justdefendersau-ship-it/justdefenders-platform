/*
Timestamp 9 March 2026 04:50
Fuel Map API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   lat:-33.8688,
   lng:151.2093,
   station:"BP Sydney",
   price:2.03
  },

  {
   lat:-32.9271,
   lng:151.7765,
   station:"Shell Newcastle",
   price:1.98
  }

 ])

}