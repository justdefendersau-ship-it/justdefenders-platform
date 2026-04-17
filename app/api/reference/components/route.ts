// Timestamp: 11 March 2026 17:24
// Defender Technical Reference API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

 const { data } = await supabase
  .from("defender_components")
  .select("*")
  .order("name")

 return NextResponse.json(data)

}