// JustDefenders ©
// File: /app/api/recommendations/route.ts
// Timestamp: 30 March 2026 06:40

import { NextResponse } from 'next/server'
import { getSupplierRecommendations } from '@/lib/queries/supplierRecommendation'

export async function GET() {
  const data = await getSupplierRecommendations()
  return NextResponse.json(data)
}