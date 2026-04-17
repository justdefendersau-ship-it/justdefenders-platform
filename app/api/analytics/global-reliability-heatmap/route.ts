/*
Timestamp: 7 March 2026 — 20:34
File: /app/api/analytics/global-reliability-heatmap/route.ts

Purpose:
Provide geospatial reliability intelligence data
for the Global Defender Reliability Heatmap.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface HeatmapPoint {

 lat: number
 lng: number
 risk_score: number
 vehicle_count: number

}

export async function GET(){

 try{

  const { data: vehicles, error } = await supabase
   .from("vehicles")
   .select(`
    vin,
    latitude,
    longitude
   `)

  if(error || !vehicles){

   console.error("Vehicle location query failed:",error)
   return NextResponse.json([])

  }

  const heatmap: HeatmapPoint[] = []

  for(const v of vehicles){

   const { data: risk } = await supabase
    .from("risk_aggregates")
    .select("risk_score")
    .eq("vin",v.vin)
    .single()

   heatmap.push({

    lat: v.latitude,
    lng: v.longitude,
    risk_score: risk?.risk_score || 0,
    vehicle_count: 1

   })

  }

  return NextResponse.json(heatmap)

 }catch(err){

  console.error("Global heatmap engine error:",err)

  return NextResponse.json([])

 }

}