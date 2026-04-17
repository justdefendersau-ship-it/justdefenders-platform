// Timestamp 6 March 2026 23:00
// File: /app/api/system/database-diagram/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { generateDatabaseDiagram }
from "@/lib/generate-db-diagram"

const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

const { data: tables } =
await supabase.rpc("get_tables_metadata")

const { data: columns } =
await supabase.rpc("get_columns_metadata")

const schema = { tables, columns }

const diagram =
generateDatabaseDiagram(schema)

return NextResponse.json({

diagram

})

}