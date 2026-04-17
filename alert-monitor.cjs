const fs = require("fs");

setInterval(() => {

  try {
    const stats = fs.statSync("C:/dev/justdefenders/logs/heartbeat.log");
    const diff = (Date.now() - new Date(stats.mtime)) / 1000;

    if (diff > 90) {
      console.log("🚨 ALERT: Heartbeat failure");
    }

  } catch {
    console.log("🚨 ALERT: Heartbeat missing");
  }

  // CLOUD FALLBACK CHECK (mock for now)
  const cloud = true;

  if (!cloud) {
    console.log("🚨 ALERT: Running on LOCAL fallback (cloud offline)");
  }

}, 60000);
