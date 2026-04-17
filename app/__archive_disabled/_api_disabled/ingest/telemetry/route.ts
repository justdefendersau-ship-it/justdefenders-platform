// Timestamp 6 March 2026 17:45
// File: /app/api/ingest/telemetry/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { publishEvent } from "@/lib/event-publisher"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const {

    vin,
    engine_temp,
    engine_load,
    latitude,
    longitude

  } = body

  await supabase
    .from("vehicle_telemetry")
    .insert({

      vin,
      engine_temp,
      engine_load,
      latitude,
      longitude,
      timestamp: new Date()

    })

  await publishEvent(

    "telemetry",
    "vehicle",
    vin,
    body

  )

  return NextResponse.json({

    message: "Telemetry recorded"

  })

}