// Timestamp 7 March 2026 03:10
// Reliability Stress Test Engine

import { NextResponse } from "next/server"

export async function POST(req:Request){

 const body = await req.json()

 const { scenario } = body

 let riskMultiplier=1

 if(scenario==="heat") riskMultiplier=1.2
 if(scenario==="dust") riskMultiplier=1.3
 if(scenario==="supplier_defect") riskMultiplier=1.5

 return NextResponse.json({

  scenario,
  risk_multiplier:riskMultiplier

 })

}