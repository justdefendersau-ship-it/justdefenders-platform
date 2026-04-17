// ------------------------------------------------------
// File: app/api/parts-recommendations/route.ts
// Timestamp: 18 March 2026 10:24
// JustDefenders ©
//
// Maps failure components → recommended parts categories
// ------------------------------------------------------

import { NextResponse } from "next/server"

type Mapping = Record<string, string[]>

const COMPONENT_PART_MAPPING: Mapping = {

  engine: ["engine"],
  turbo: ["turbo"],
  cooling: ["cooling"],
  suspension: ["suspension"],
  fuel: ["fuel"]

}

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const component = searchParams.get("component")?.toLowerCase()

  if (!component) {

    return NextResponse.json(
      { error: "Missing component" },
      { status: 400 }
    )

  }

  const matchedKey = Object.keys(COMPONENT_PART_MAPPING)
    .find(key => component.includes(key))

  const recommendations = matchedKey
    ? COMPONENT_PART_MAPPING[matchedKey]
    : []

  return NextResponse.json({
    component,
    recommendations
  })

}