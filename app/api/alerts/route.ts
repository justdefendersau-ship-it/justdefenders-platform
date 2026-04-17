# ==================================================================================================
# File: C:\dev\justdefenders\app\api\alerts\route.ts
# Timestamp: 13 April 2026 14:20
# Purpose: Save alerts for price tracking
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\app\api\alerts" | Out-Null

@'
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "alerts.json");

export async function POST(req: Request) {

  const body = await req.json();

  let alerts: any[] = [];

  if (fs.existsSync(file)) {
    alerts = JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  alerts.push({
    ...body,
    createdAt: new Date().toISOString()
  });

  fs.writeFileSync(file, JSON.stringify(alerts, null, 2));

  return NextResponse.json({ success: true });
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\api\alerts\route.ts" -Encoding UTF8