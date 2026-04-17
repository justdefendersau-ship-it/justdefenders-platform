// Timestamp 6 March 2026 16:45
// File: /lib/api-auth.ts

/*
API Authentication Middleware
*/

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function validateApiKey(key: string) {

  if (!key) {

    throw new Error("API key required")

  }

  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("key_hash", key)
    .eq("status", "active")
    .single()

  if (!data) {

    throw new Error("Invalid API key")

  }

  return data.organization_id

}