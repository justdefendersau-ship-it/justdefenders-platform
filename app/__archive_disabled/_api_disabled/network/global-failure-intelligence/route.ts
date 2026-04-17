/*
Timestamp: 8 March 2026 — 22:05
Global Failure Intelligence API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {
   component:"EGR Valve",
   globalFailureRate:12.4
  },

  {
   component:"Turbocharger",
   globalFailureRate:8.1
  },

  {
   component:"Injector",
   globalFailureRate:6.7
  }

 ])

}