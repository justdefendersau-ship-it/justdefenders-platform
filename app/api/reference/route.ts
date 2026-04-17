// Timestamp: 11 March 2026 18:38
// Technical components API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("technical_components")
  .select("*")
  .order("component_name")

 return NextResponse.json(data)

}