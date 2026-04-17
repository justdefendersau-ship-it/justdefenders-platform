/*
Timestamp: 8 March 2026 — 17:45
Global Reliability Map API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {lat:-33.8688,lng:151.2093}, // Sydney
  {lat:51.5072,lng:-0.1276},   // London
  {lat:40.7128,lng:-74.0060},  // New York

 ])

}