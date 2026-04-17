// Timestamp 7 March 2026 10:50
// Ownership Cost Dashboard API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

 const { searchParams } = new URL(req.url)
 const vehicle_id = searchParams.get("vehicle_id")

 // Fuel Spend

 const { data: fuel } = await supabase
  .from("fuel_logs")
  .select("total_cost")
  .eq("vehicle_id", vehicle_id)

 let fuelSpend = 0
 for (const f of fuel || []) fuelSpend += f.total_cost || 0

 // Workshop Spend

 const { data: invoices } = await supabase
  .from("workshop_invoices")
  .select("total_amount")
  .eq("vehicle_id", vehicle_id)

 let maintenanceSpend = 0
 for (const i of invoices || []) maintenanceSpend += i.total_amount || 0

 // Parts Spend

 const { data: parts } = await supabase
  .from("my_shed_parts")
  .select("quantity,purchase_price")
  .eq("vehicle_id", vehicle_id)

 let partsSpend = 0
 for (const p of parts || [])
  partsSpend += (p.quantity || 0) * (p.purchase_price || 0)

 const totalOwnershipCost =
  fuelSpend + maintenanceSpend + partsSpend

 return NextResponse.json({

  fuel_spend: fuelSpend,
  maintenance_spend: maintenanceSpend,
  parts_spend: partsSpend,
  total_cost: totalOwnershipCost

 })

}