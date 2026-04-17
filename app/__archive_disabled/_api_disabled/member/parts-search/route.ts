// route.ts
// Timestamp: 10 March 2026 09:45
// Commentary:
// API endpoint for Defender parts search.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const query = searchParams.get("query") || ""
 const condition = searchParams.get("condition") || "all"

 let db = supabase
  .from("supplier_parts")
  .select("*")
  .ilike("part_name", `%${query}%`)

 if(condition !== "all"){
  db = db.eq("condition", condition)
 }

 const { data,error } = await db.order("price",{ ascending:true })

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json(data)

}