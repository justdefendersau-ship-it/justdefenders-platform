// Timestamp 6 March 2026 22:30
// File: /app/api/system/generate-db-map/route.ts

/*
Supabase Database Map Generator

Extracts database schema metadata
and returns a structured database map.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

 const { data: tables } = await supabase.rpc(
   "get_tables_metadata"
 )

 const { data: columns } = await supabase.rpc(
   "get_columns_metadata"
 )

 const schemaMap = {

   tables,
   columns

 }

 return NextResponse.json(schemaMap)

}