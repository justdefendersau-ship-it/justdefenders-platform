// Timestamp 6 March 2026 19:35
// File: /app/api/ai/fleet-residual-forecast/route.ts

/*
Fleet Residual Value Forecast
Predicts fleet resale value trajectory
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

 const { data: vehicles } = await supabase
   .from("vehicles")
   .select("model, production_year")

 const forecasts = []

 for (const v of vehicles ?? []) {

   const base = 60000

   const year1 = base * 0.90
   const year2 = base * 0.80
   const year3 = base * 0.70

   forecasts.push({

     model: v.model,
     production_year: v.production_year,
     value_year_1: year1,
     value_year_2: year2,
     value_year_3: year3

   })

 }

 if (forecasts.length > 0) {

   await supabase
     .from("fleet_residual_forecasts")
     .insert(forecasts)

 }

 return NextResponse.json({

   forecasts_generated: forecasts.length

 })

}