// route.ts
// Timestamp: 10 March 2026 10:45
// Commentary:
// Calculates fuel economy statistics.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("fuel_logs")
  .select("*")
  .order("odometer",{ ascending:true })

 if(!data || data.length < 2){

  return NextResponse.json({})

 }

 let totalLitres = 0
 let totalDistance = 0

 for(let i=1;i<data.length;i++){

  const distance =
   data[i].odometer - data[i-1].odometer

  totalDistance += distance
  totalLitres += data[i].litres

 }

 const l100km =
  (totalLitres / totalDistance) * 100

 return NextResponse.json({

  average_consumption:l100km.toFixed(2)

 })

}