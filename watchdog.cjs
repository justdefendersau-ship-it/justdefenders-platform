const fs = require("fs");
const { exec } = require("child_process");

function getLastHeartbeat() {
  try {
    const stats = fs.statSync("C:/dev/justdefenders/logs/heartbeat.log");
    return new Date(stats.mtime);
  } catch {
    return null;
  }
}

setInterval(() => {

  const last = getLastHeartbeat();
  const now = new Date();

  if (!last || (now - last) / 1000 > 90) {

    console.log("⚠️ Heartbeat missing — restarting system");

    exec("C:/dev/justdefenders/start-all.bat");

  } else {
    console.log("✅ System healthy");
  }

}, 60000);
