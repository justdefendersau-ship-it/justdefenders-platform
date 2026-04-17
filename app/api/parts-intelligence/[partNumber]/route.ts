// Timestamp: 11 March 2026 22:15
// Parts Intelligence API
// Combines catalog, suppliers and reliability data

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
 req:Request,
 { params }: { params:{ partNumber:string } }
){

 const partNumber = params.partNumber

 const { data:catalog } = await supabase
  .from("parts_catalog")
  .select("*")
  .eq("part_number",partNumber)
  .single()

 const { data:suppliers } = await supabase
  .from("supplier_parts")
  .select("*")
  .eq("part_number",partNumber)

 const { data:reliability } = await supabase
  .from("part_reliability_reports")
  .select("*")
  .eq("part_number",partNumber)
  .single()

 return NextResponse.json({

  catalog,
  suppliers,
  reliability

 })

}