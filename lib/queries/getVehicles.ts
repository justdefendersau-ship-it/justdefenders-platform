// JustDefenders ©
// File: /lib/queries/getVehicles.ts
// Timestamp: 30 March 2026 05:20

import { createClient } from '@/lib/supabase/server'

export async function getVehicles() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')

  if (error) throw error

  return data
}