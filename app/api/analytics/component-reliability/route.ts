/*
Timestamp: 8 March 2026 — 21:05
Component Reliability Rankings API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {component:"EGR Valve",score:86},
  {component:"Turbocharger",score:91},
  {component:"Injector",score:89}

 ])

}