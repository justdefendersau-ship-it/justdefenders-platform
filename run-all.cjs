const { spawn } = require("child_process");
const fs = require("fs");

const LOG_FILE = "./data/systemLogs.json";

// ALWAYS INITIALISE FILE
fs.writeFileSync(LOG_FILE, JSON.stringify(["[SYSTEM] Started"], null, 2));

let logs = ["[SYSTEM] Started"];

const services = [
  { name: "API", file: "apiServer.cjs" },
  { name: "Crawler", file: "crawler.cjs" },
  { name: "Harvester", file: "harvester.cjs" },
  { name: "Cleanup", file: "cleanup.cjs" },
  { name: "Storage", file: "cleanup-size.cjs" },
  { name: "Anomaly", file: "anomaly.cjs" },
  { name: "Ranking", file: "ranking.cjs" },
  { name: "Predict", file: "predict.cjs" },
  { name: "Recommend", file: "recommend.cjs" },
  { name: "OEM", file: "oemEngine.cjs" },
  { name: "Email", file: "emailService.cjs" }
];

let status = {};

function timestamp() {
  return new Date().toISOString();
}

function writeLogs() {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

function log(service, message) {

  const lines = message.split("\n").filter(l => l.trim());

  lines.forEach(line => {
    const entry = "[" + timestamp() + "] [" + service + "] " + line.trim();
    logs.push(entry);
  });

  if (logs.length > 200) logs = logs.slice(-200);

  writeLogs();
}

function startService(s) {

  status[s.name] = "STARTING";

  const proc = spawn("node", [s.file]);

  log(s.name, "starting...");

  proc.stdout.on("data", (data) => {
    status[s.name] = "RUNNING";
    log(s.name, data.toString());
  });

  proc.stderr.on("data", (data) => {
    status[s.name] = "ERROR";
    log("ERROR " + s.name, data.toString());
  });

  proc.on("close", () => {
    status[s.name] = "RESTARTING";
    log(s.name, "restarting...");
    setTimeout(() => startService(s), 2000);
  });
}

services.forEach(startService);

// STATUS FILE
setInterval(() => {
  fs.writeFileSync("./data/systemStatus.json", JSON.stringify(status, null, 2));
}, 2000);