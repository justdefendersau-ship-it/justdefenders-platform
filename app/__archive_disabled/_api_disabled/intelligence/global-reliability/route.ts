/*
Timestamp: 5 March 2026 15:42
File: app/api/intelligence/global-reliability/route.ts

Global Defender Reliability Engine

Calculates reliability scores for vehicles.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type ReliabilityResult = {

  vehicleId:string
  model:string
  engine:string
  vehicleAge:number
  maintenanceEvents:number
  predictedFailures:number
  communityFailureRate:number
  reliabilityScore:number

}

export async function GET(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data:vehicles } = await supabase
    .from("vehicles")
    .select("id,model,engine,year")

  const { data:maintenance } = await supabase
    .from("maintenance_predictions")
    .select("vehicle_id")

  const maintenanceCounts:Record<string,number> = {}

  maintenance?.forEach(m=>{

    const id = m.vehicle_id

    maintenanceCounts[id] = (maintenanceCounts[id] || 0) + 1

  })

  const currentYear = new Date().getFullYear()

  const results:ReliabilityResult[] = []

  vehicles?.forEach(v=>{

    const age = currentYear - (v.year || currentYear)

    const maintenanceEvents = maintenanceCounts[v.id] || 0

    const predictedFailures = Math.floor(maintenanceEvents * 0.4)

    const communityFailureRate = 0.08

    let score =
      100
      - (age * 1.2)
      - (maintenanceEvents * 2)
      - (predictedFailures * 5)
      - (communityFailureRate * 10)

    score = Math.max(0,Math.min(100,score))

    results.push({

      vehicleId:v.id,
      model:v.model,
      engine:v.engine,
      vehicleAge:age,
      maintenanceEvents,
      predictedFailures,
      communityFailureRate,
      reliabilityScore:Number(score.toFixed(2))

    })

  })

  return NextResponse.json(results)

}