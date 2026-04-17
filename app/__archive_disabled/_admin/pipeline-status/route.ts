// route.ts
// Timestamp: 9 March 2026 21:52
// Commentary:
// Admin API providing reliability pipeline health.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function count(table:string){

 const { data } = await supabase
  .from(table)
  .select("*")

 return data?.length ?? 0
}

export async function GET(){

 const reports = await count("community_failure_reports")
 const failures = await count("defender_failures")
 const curves = await count("failure_mileage_curves")
 const risk = await count("component_risk_profiles")

 return NextResponse.json({

  reports,
  failures,
  curves,
  risk

 })

}