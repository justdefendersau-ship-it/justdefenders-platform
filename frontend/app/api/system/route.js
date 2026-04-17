import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function getDiskUsage(){

  try{
    const output = execSync("wmic logicaldisk get size,freespace,caption").toString();

    const lines = output.split("\n").filter(l=>l.includes("C:"));

    if(lines.length === 0) return 0;

    const parts = lines[0].trim().split(/\s+/);

    const free = parseInt(parts[1]);
    const size = parseInt(parts[2]);

    const used = size - free;
    const percent = Math.round((used / size) * 100);

    return percent;

  }catch(e){
    return 0;
  }
}

export async function GET(){

  const logFile = path.join(process.cwd(),"../data/system.log");

  let logExists = fs.existsSync(logFile);
  let logSize = logExists ? fs.statSync(logFile).size : 0;

  const diskPercent = getDiskUsage();

  let usageState = true;
  if(diskPercent > 85) usageState = "warn";
  if(diskPercent > 95) usageState = false;

  return Response.json({

    heartbeat: Date.now(),

    storage:{
      percent: diskPercent
    },

    services:{

      api: true,
      harvester: logSize > 0 ? true : "warn",
      crawler: "warn",
      decision: true,
      charts: true,
      logs: logExists,

      storage_local: true,
      storage_cloud: "warn",
      storage_usage: usageState,

      email: "warn",
      alerts: "warn",
      prediction: true,
      intelligence: true

    }

  });
}