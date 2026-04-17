/*
Timestamp: 9 March 2026 — 00:15
Global Parts Compatibility Graph API
*/

import { NextResponse } from "next/server"

export async function GET(){

 const graph = {

  nodes:[

   {id:"Defender 2.2 TDCi",group:"vehicle"},
   {id:"Turbocharger",group:"component"},
   {id:"LR056369",group:"oem-part"},
   {id:"BorgWarner BV39",group:"aftermarket"},
   {id:"Bosch Injector",group:"aftermarket"}

  ],

  links:[

   {source:"Defender 2.2 TDCi",target:"Turbocharger"},
   {source:"Turbocharger",target:"LR056369"},
   {source:"LR056369",target:"BorgWarner BV39"},
   {source:"LR056369",target:"Bosch Injector"}

  ]

 }

 return NextResponse.json(graph)

}