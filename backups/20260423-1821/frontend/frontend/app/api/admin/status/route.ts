import { NextResponse } from "next/server";
import fs from "fs";

export async function GET() {

  let harvester = false;
  let crawler = false;
  let backup = false;

  try {
    const logs = fs.readFileSync("C:/dev/justdefenders/logs/harvester.log", "utf8");
    harvester = logs.includes("HEARTBEAT");
  } catch {}

  try {
    const logs = fs.readFileSync("C:/dev/justdefenders/logs/crawler.log", "utf8");
    crawler = logs.includes("Running cycle");
  } catch {}

  try {
    const backupLog = fs.readFileSync("C:/dev/justdefenders/logs/backup.log", "utf8");
    backup = backupLog.includes("SUCCESS");
  } catch {}

  return NextResponse.json({
    harvester,
    crawler,
    backup,
    timestamp: new Date().toISOString()
  });
}
