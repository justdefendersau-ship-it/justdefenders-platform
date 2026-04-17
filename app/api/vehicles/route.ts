// JustDefenders ©
// File: /app/api/vehicles/route.ts
// Timestamp: 30 March 2026 06:30

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(data)
}