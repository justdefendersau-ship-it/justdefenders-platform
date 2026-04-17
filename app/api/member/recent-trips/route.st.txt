// Timestamp: 11 March 2026 14:45
// API returning latest maintenance records

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("maintenance_records")
  .select("*")
  .order("date",{ascending:false})
  .limit(5)

 return NextResponse.json(data)

}