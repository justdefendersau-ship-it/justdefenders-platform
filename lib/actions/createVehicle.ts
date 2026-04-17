// JustDefenders ©
// File: /lib/actions/createVehicle.ts
// Timestamp: 30 March 2026 06:55

import { createClient } from '@/lib/supabase/server'
import { getOrganisation } from '@/lib/auth/getOrganisation'

type CreateVehicleInput = {
  vin: string
  make?: string
  model_id?: string
}

export async function createVehicle(input: CreateVehicleInput) {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthenticated')
  }

  // Get organisation
  const organisation_id = await getOrganisation()

  if (!organisation_id) {
    throw new Error('No organisation found for user')
  }

  // Insert vehicle (RLS + org scoped)
  const { data, error } = await supabase
    .from('vehicles')
    .insert({
      vin: input.vin,
      make: input.make || null,
      model_id: input.model_id || null,
      user_id: user.id,              // optional (legacy support)
      organisation_id: organisation_id,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}