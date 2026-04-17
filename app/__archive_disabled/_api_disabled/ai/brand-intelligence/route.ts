// Timestamp 7 March 2026 00:30
// File: /app/api/ai/brand-intelligence/route.ts

/*
Brand Reliability Intelligence Engine

Aggregates reliability metrics
across vehicle brands.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data: brands } =
 await supabase
  .from("vehicle_brands")
  .select("*")

 const results = []

 for(const b of brands ?? []){

  const { data: models } =
  await supabase
   .from("vehicle_models")
   .select("*")
   .eq("brand_id",b.id)

  results.push({

   brand:b.brand_name,
   models:models?.length ?? 0

  })

 }

 return NextResponse.json({

  brands:results

 })

}