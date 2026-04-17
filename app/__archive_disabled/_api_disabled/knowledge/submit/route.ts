// Timestamp: 11 March 2026 19:45
// API: Submit Knowledge Article

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:any){

 const body = await req.json()

 const { title,url,component,summary } = body

 await supabase.from("knowledge_articles").insert({

  title,
  url,
  component,
  summary,
  source:"member"

 })

 return NextResponse.json({success:true})

}