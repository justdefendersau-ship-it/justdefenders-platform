// Timestamp 7 March 2026 10:15
// Shed Inventory Value

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

 const { data } = await supabase
  .from("my_shed_parts")
  .select("quantity,purchase_price")

 let total = 0

 for (const p of data || []) {

  total += (p.quantity || 0) * (p.purchase_price || 0)

 }

 return NextResponse.json({
  inventory_value: total
 })

}