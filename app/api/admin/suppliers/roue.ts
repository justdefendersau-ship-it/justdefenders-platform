# ==================================================================================================
# File: C:\dev\justdefenders\app\api\admin\suppliers\route.ts
# Timestamp: 13 April 2026 14:20
# Purpose: Approve supplier nominations
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\app\api\admin\suppliers" | Out-Null

@'
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const nominationsFile = path.join(process.cwd(), "data", "supplier-nominations.json");
const suppliersFile = path.join(process.cwd(), "data", "suppliers.json");

export async function GET() {
  if (!fs.existsSync(nominationsFile)) return NextResponse.json([]);
  return NextResponse.json(JSON.parse(fs.readFileSync(nominationsFile, "utf-8")));
}

export async function POST(req: Request) {

  const { index } = await req.json();

  const nominations = JSON.parse(fs.readFileSync(nominationsFile, "utf-8"));
  const suppliers = JSON.parse(fs.readFileSync(suppliersFile, "utf-8"));

  const approved = nominations[index];

  suppliers.push({
    name: approved.name,
    type: "community",
    region: "AU"
  });

  nominations.splice(index, 1);

  fs.writeFileSync(suppliersFile, JSON.stringify(suppliers, null, 2));
  fs.writeFileSync(nominationsFile, JSON.stringify(nominations, null, 2));

  return NextResponse.json({ success: true });
}
'@ | Set-Content -Path "C:\dev\justdefenders\app\api\admin\suppliers\route.ts" -Encoding UTF8