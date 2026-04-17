// Timestamp 7 March 2026
// File: /app/api/ingest/workshop-service/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const {

    vin,
    service_type,
    description,
    parts_used,
    labour_hours,
    workshop_name,
    service_date

  } = body

  await supabase
    .from("workshop_service_events")
    .insert({

      vin,
      service_type,
      description,
      parts_used,
      labour_hours,
      workshop_name,
      service_date

    })

  return NextResponse.json({

    message: "Workshop service recorded"

  })

}