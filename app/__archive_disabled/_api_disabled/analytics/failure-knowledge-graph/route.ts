/*
Timestamp: 8 March 2026 — 20:50
Fleet Failure Knowledge Graph API
*/

import { NextResponse } from "next/server"

export async function GET(){

 const graph = {

  nodes:[

   {id:"EGR Valve",group:"component"},
   {id:"Turbocharger",group:"component"},
   {id:"Injector",group:"component"},
   {id:"DPF",group:"component"}

  ],

  links:[

   {source:"EGR Valve",target:"Turbocharger"},
   {source:"Turbocharger",target:"Injector"},
   {source:"Injector",target:"DPF"}

  ]

 }

 return NextResponse.json(graph)

}