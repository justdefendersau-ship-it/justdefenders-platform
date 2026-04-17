// Timestamp 6 March 2026 23:00
// File: /app/api/system/architecture-diagram/route.ts

import { NextResponse } from "next/server"
import { generateArchitectureDiagram }
from "@/lib/generate-architecture-graph"

export async function GET(){

const diagram = generateArchitectureDiagram()

return NextResponse.json({

diagram

})

}