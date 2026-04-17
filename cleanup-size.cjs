const fs = require("fs");

const MAX_MB = 50;

function check() {
  try {
    const file = "./data/priceHistory.json";

    if (!fs.existsSync(file)) return;

    const stats = fs.statSync(file);
    const size = stats.size / (1024 * 1024);

    if (size > MAX_MB) {
      console.log("🚨 File too large — trimming");

      let data = JSON.parse(fs.readFileSync(file));

      for (let part in data) {
        for (let supplier in data[part]) {
          let arr = data[part][supplier];
          data[part][supplier] = arr.slice(-Math.floor(arr.length / 2));
        }
      }

      fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }

    console.log("💾 Storage OK:", size.toFixed(2), "MB");

  } catch (err) {
    console.log("❌ Storage check error:", err.message);
  }
}

setInterval(check, 60000);
check();