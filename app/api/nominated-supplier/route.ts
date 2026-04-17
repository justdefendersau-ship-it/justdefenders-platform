# ==================================================================================================
# File: C:\dev\justdefenders\app\api\nominate-supplier\route.ts
# Timestamp: 13 April 2026 14:10
# Purpose: Allow members to nominate suppliers
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\app\api\nominate-supplier" | Out-Null

@'
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  const body = await req.json();

  const filePath = path.join(process.cwd(), "data", "supplier-nominations.json");

  let existing: any[] = [];

  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  existing.push({
    ...body,
    status: "pending",
    createdAt: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true });
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\api\nominate-supplier\route.ts" -Encoding UTF8

Write-Host "✅ Supplier nomination API created"