const fs = require("fs");

function load(path) {
  try { return JSON.parse(fs.readFileSync(path)); }
  catch { return {}; }
}

function save(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function alert(msg) {
  console.log("🚨 CLEANUP ALERT:", msg);

  let alerts = load("./data/systemAlerts.json");
  alerts.cleanupFailure = true;
  alerts.lastCleanupAlert = new Date().toISOString();
  save("./data/systemAlerts.json", alerts);
}

function processRetention() {

  try {

    let history = load("./data/priceHistory.json");
    const now = new Date();

    for (let part in history) {
      for (let supplier in history[part]) {

        let records = history[part][supplier];
        let recent = [];
        let hourly = {};
        let daily = {};

        records.forEach(r => {
          const t = new Date(r.timestamp);
          const age = (now - t) / (1000*60*60*24);

          if (age <= 30) {
            recent.push(r);
          } else if (age <= 180) {
            const key = t.toISOString().slice(0,13);
            if (!hourly[key]) hourly[key] = r;
          } else {
            const key = t.toISOString().slice(0,10);

            if (!daily[key]) {
              daily[key] = { min:r.price, max:r.price, total:r.price, count:1, timestamp:key };
            } else {
              daily[key].min = Math.min(daily[key].min, r.price);
              daily[key].max = Math.max(daily[key].max, r.price);
              daily[key].total += r.price;
              daily[key].count++;
            }
          }
        });

        let dailyArr = Object.values(daily).map(d => ({
          price: Math.round(d.total/d.count),
          timestamp: d.timestamp,
          summary:true,
          min:d.min,
          max:d.max
        }));

        history[part][supplier] = [
          ...recent,
          ...Object.values(hourly),
          ...dailyArr
        ];
      }
    }

    save("./data/priceHistory.json", history);

    console.log("🧹 Cleanup OK");

  } catch (err) {
    alert(err.message);
  }
}

setInterval(processRetention, 60000);
