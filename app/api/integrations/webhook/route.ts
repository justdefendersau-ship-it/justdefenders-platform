// Timestamp 7 March 2026
// File: /app/api/integrations/webhook/route.ts

/*
Fleet Integration Webhook

Receives data from telematics systems
and routes it into ingestion APIs.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const payload = await req.json()

  const {

    vin,
    odometer,
    engine_temp,
    engine_load,
    latitude,
    longitude,
    fault_code

  } = payload

  if (vin) {

    await supabase
      .from("vehicle_telemetry")
      .insert({

        vin,
        odometer,
        engine_temp,
        engine_load,
        latitude,
        longitude,
        timestamp: new Date()

      })

  }

  if (fault_code) {

    await supabase
      .from("vehicle_fault_codes")
      .insert({

        vin,
        fault_code,
        description: "Imported from fleet integration"

      })

  }

  return NextResponse.json({

    message: "Integration event processed"

  })

}