// JustDefenders ©
// File: /app/api/predictions/route.ts
// Timestamp: 30 March 2026 06:35

import { NextResponse } from 'next/server'
import { getFailurePredictionsOdo } from '@/lib/queries/failurePredictionOdo'

export async function GET() {
  const data = await getFailurePredictionsOdo()
  return NextResponse.json(data)
}