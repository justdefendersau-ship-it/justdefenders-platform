/*
Timestamp: 8 March 2026 — 18:40
Fleet Risk Distribution API
*/

import { NextResponse } from "next/server"

export async function GET(){

 return NextResponse.json([

  {name:"Low Risk",value:2},
  {name:"Medium Risk",value:1},
  {name:"High Risk",value:0}

 ])

}