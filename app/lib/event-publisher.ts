// Timestamp 6 March 2026 17:45
// File: /lib/event-publisher.ts

/*
Reliability Event Publisher
Adds events to the streaming pipeline
*/

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function publishEvent(

  event_type: string,
  entity_type: string,
  entity_id: string,
  payload: any

) {

  await supabase
    .from("reliability_event_stream")
    .insert({

      event_type,
      entity_type,
      entity_id,
      payload

    })

}