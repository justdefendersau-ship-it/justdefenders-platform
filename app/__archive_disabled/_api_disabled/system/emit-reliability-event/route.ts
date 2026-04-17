// Timestamp 7 March 2026
// File: /app/api/system/emit-reliability-event/route.ts

/*
Reliability Event Producer

Used by all intelligence engines
to emit reliability events.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const {

    event_type,
    entity_id,
    severity,
    metadata

  } = body

  await supabase
    .from("reliability_events")
    .insert({

      event_type,
      entity_id,
      severity,
      metadata

    })

  return NextResponse.json({

    message: "Event emitted"

  })

}