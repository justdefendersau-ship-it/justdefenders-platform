// route.ts
// Timestamp: 10 March 2026 13:05
// Commentary:
// Adds a part to the member's shed inventory.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const { error } = await supabase
  .from("my_shed_inventory")
  .insert(body)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json({ success:true })

}