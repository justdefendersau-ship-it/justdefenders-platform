// route.ts
// Timestamp: 10 March 2026 10:10
// Commentary:
// Returns compatible parts for a given part number.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const part = searchParams.get("part")

 const { data,error } = await supabase
  .from("parts_compatibility")
  .select("*")
  .eq("original_part",part)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json(data)

}