const fs = require("fs");

const now = new Date().toISOString();

fs.writeFileSync(
  "C:/dev/justdefenders/logs/backup.log",
  `BACKUP SUCCESS ${now}`
);

console.log("✅ Backup logged:", now);
