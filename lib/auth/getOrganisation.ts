// JustDefenders ©
// File: /lib/auth/getOrganisation.ts
// Timestamp: 30 March 2026 06:20

import { createClient } from '@/lib/supabase/server'

export async function getOrganisation() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('organisation_members')
    .select('organisation_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  return data?.organisation_id || null
}