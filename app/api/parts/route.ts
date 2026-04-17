# ==================================================================================================
# File: C:\dev\justdefenders\app\api\parts\route.ts
# Timestamp: 13 April 2026 14:35
# Purpose: Pass VIN + REGO to engine
# JustDefenders ©
# ==================================================================================================

@'
import { NextResponse } from "next/server";
import { runDecisionEngine } from "@/lib/engine/decisionEngine";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const result = await runDecisionEngine({
    partNumber: searchParams.get("part"),
    vin: searchParams.get("vin"),
    rego: searchParams.get("rego"),
    state: searchParams.get("state"),
    includeUsed: searchParams.get("used") === "true"
  });

  return NextResponse.json(result);
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\api\parts\route.ts" -Encoding UTF8

Write-Host "✅ API updated for VIN + REGO"