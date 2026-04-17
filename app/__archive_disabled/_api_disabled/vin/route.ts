/*
=====================================================
REAL VIN DECODER (NHTSA API Example)
Timestamp: 26 Feb 2026 20:30
=====================================================
*/

import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { vin } = await req.json()

  if (!vin || vin.length !== 17)
    return NextResponse.json({ error: "Invalid VIN" }, { status: 400 })

  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
  )

  const data = await response.json()

  return NextResponse.json({
    decoded: data.Results
  })
}