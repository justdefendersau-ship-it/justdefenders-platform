// Timestamp: 11 March 2026 13:55
// Commentary:
// Parts search API with supplier comparison,
// failure intelligence and cross-reference alternatives.

import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(req:Request){

 const {searchParams} = new URL(req.url)

 const query = searchParams.get("q") || ""
 const used = searchParams.get("used") === "true"

 const {data:parts} = await supabase
  .from("supplier_parts")
  .select(`
   part_number,
   price,
   stock_quantity,
   condition,
   suppliers(
    name,
    rating
   )
  `)
  .ilike("part_number",`%${query}%`)

 let results = parts?.map((item:any)=>({

  part_number:item.part_number,
  price:item.price,
  stock_quantity:item.stock_quantity,
  condition:item.condition,
  supplier:item.suppliers?.name || "Unknown",
  rating:item.suppliers?.rating || 0,
  distance:"-"

 })) || []

 if(used){

  results = results.filter(p => p.condition === "used")

 }

 const cheapest = Math.min(...results.map(p=>p.price || 999999))

 results = results.map(p=>({

  ...p,
  cheapest:p.price === cheapest

 }))

 const {data:crossrefs} = await supabase
  .from("part_cross_reference")
  .select("*")
  .ilike("oem_part_number",`%${query}%`)

 const {data:failures} = await supabase
  .from("defender_failures")
  .select("component,average_mileage,risk_level")
  .ilike("component",`%${query}%`)
  .limit(1)

 return NextResponse.json({

  parts:results,
  cross_references:crossrefs || [],
  failure_info:failures?.[0] || null

 })

}