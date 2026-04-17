// Timestamp: 11 March 2026 21:06
// Maintenance Cost Analytics API
// Calculates maintenance statistics for a vehicle

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
 req:Request,
 { params }: { params:{ vehicleId:string } }
){

 const vehicleId = params.vehicleId

 const { data:records } = await supabase
  .from("maintenance_records")
  .select("*")
  .eq("vehicle_id",vehicleId)

 if(!records || records.length === 0){

  return NextResponse.json({

   lifetimeCost:0,
   annualCost:0,
   categoryCosts:{}

  })

 }

 let lifetimeCost = 0
 const categoryCosts:any = {}

 records.forEach(r=>{

  const cost = Number(r.cost || 0)
  lifetimeCost += cost

  const category = r.category || "General"

  if(!categoryCosts[category]){
   categoryCosts[category] = 0
  }

  categoryCosts[category] += cost

 })

 const firstYear =
  new Date(records[0].date).getFullYear()

 const currentYear =
  new Date().getFullYear()

 const yearsOwned =
  Math.max(currentYear - firstYear,1)

 const annualCost =
  lifetimeCost / yearsOwned

 return NextResponse.json({

  lifetimeCost:lifetimeCost.toFixed(2),
  annualCost:annualCost.toFixed(2),
  categoryCosts

 })

}