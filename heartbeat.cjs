const fs = require("fs");

setInterval(() => {
  const now = new Date().toISOString();

  fs.writeFileSync(
    "C:/dev/justdefenders/logs/heartbeat.log",
    `HEARTBEAT ${now}`
  );

  console.log("❤️ HEARTBEAT SENT", now);

}, 30000); // every 30 seconds
