/*
Timestamp: 8 March 2026 — 21:05
Regional Failure Heatmap API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {region:"Australia",failures:4},
  {region:"UK",failures:2},
  {region:"USA",failures:3}

 ])

}