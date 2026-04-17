/*
Timestamp: 8 March 2026 — 22:25
Fleet Reliability AI Copilot API
*/

import { NextResponse } from "next/server"

export async function POST(request:Request){

 const body = await request.json()

 const question = body.question

 let response = "I could not determine an answer."

 if(question.toLowerCase().includes("turbo")){

  response =
   "Turbocharger failures are increasing. Most failures are linked to EGR valve contamination."

 }

 if(question.toLowerCase().includes("supplier")){

  response =
   "Bosch components currently have the highest reliability score across the fleet."

 }

 if(question.toLowerCase().includes("maintenance")){

  response =
   "Schedule turbo inspections for vehicles exceeding 120,000 km."

 }

 return NextResponse.json({

  answer:response

 })

}