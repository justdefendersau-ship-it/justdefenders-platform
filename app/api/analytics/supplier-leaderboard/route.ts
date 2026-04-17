/*
Timestamp: 8 March 2026 — 18:10
Supplier Reliability Leaderboard API
*/

import { NextResponse } from "next/server"
import SupplierReliabilityPanel from "@/app/components/SupplierReliabilityPanel"

export async function GET(){

 return NextResponse.json([

  {supplier:"Bosch",failures:3,score:97},
  {supplier:"BorgWarner",failures:5,score:93},
  {supplier:"ZF",failures:7,score:89}

 ])

}