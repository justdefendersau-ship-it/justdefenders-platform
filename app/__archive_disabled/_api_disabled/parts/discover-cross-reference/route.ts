/*
Timestamp: 7 March 2026 — 22:56
File: /app/api/parts/discover-cross-references/route.ts

Purpose:
Automatic cross-reference discovery engine
for Defender parts compatibility.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function normalize(text:string){

 return text
  .toLowerCase()
  .replace(/[^a-z0-9 ]/g,"")
  .trim()

}

function similarity(a:string,b:string){

 const aWords = a.split(" ")
 const bWords = b.split(" ")

 let matches = 0

 aWords.forEach(w=>{
  if(bWords.includes(w)) matches++
 })

 return matches / Math.max(aWords.length,bWords.length)

}

export async function GET(){

 try{

  const discoveries:any[] = []

  const { data: jlrParts } = await supabase
   .from("jlr_part_registry")
   .select("part_number,description")

  const { data: supplierParts } = await supabase
   .from("supplier_parts")
   .select("supplier_part_number,brand,description")

  if(!jlrParts || !supplierParts){
   return NextResponse.json([])
  }

  for(const jlr of jlrParts){

   const jlrDesc = normalize(jlr.description || "")

   for(const sup of supplierParts){

    const supDesc = normalize(sup.description || "")

    const score = similarity(jlrDesc,supDesc)

    if(score > 0.6){

     discoveries.push({

      base_part_number: jlr.part_number,
      cross_part_number: sup.supplier_part_number,
      brand: sup.brand,
      description: sup.description

     })

    }

   }

  }

  for(const d of discoveries){

   await supabase
    .from("part_cross_reference")
    .upsert({

     base_part_number: d.base_part_number,
     cross_part_number: d.cross_part_number,
     brand: d.brand,
     description: d.description

    },{
     onConflict: "base_part_number,cross_part_number"
    })

  }

  return NextResponse.json({

   discovered: discoveries.length

  })

 }catch(err){

  console.error("Cross reference discovery error:",err)

  return NextResponse.json({

   discovered:0

  })

 }

}