/*
Timestamp: 8 March 2026 — 21:05
Global Defender Reliability Network API
*/

import { NextResponse } from "next/server"

export async function GET(){

 const graph = {

  nodes:[

   {id:"Australia",group:"region"},
   {id:"UK",group:"region"},
   {id:"USA",group:"region"},

   {id:"EGR Valve",group:"component"},
   {id:"Turbocharger",group:"component"},
   {id:"Injector",group:"component"}

  ],

  links:[

   {source:"Australia",target:"EGR Valve"},
   {source:"UK",target:"Turbocharger"},
   {source:"USA",target:"Injector"}

  ]

 }

 return NextResponse.json(graph)

}