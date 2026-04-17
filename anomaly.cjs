const fs = require("fs");

function load(p){ try{return JSON.parse(fs.readFileSync(p));}catch{return{}} }
function save(p,d){ fs.writeFileSync(p,JSON.stringify(d,null,2)); }

function detect() {

  let history = load("./data/priceHistory.json");
  let alerts = [];

  for (let part in history) {
    for (let supplier in history[part]) {

      let arr = history[part][supplier];
      if (arr.length < 5) continue;

      let last = arr[arr.length-1].price;
      let avg = arr.slice(-5).reduce((a,b)=>a+b.price,0)/5;

      let diff = (last - avg) / avg;

      if (Math.abs(diff) > 0.3) {
        alerts.push({
          part,
          supplier,
          price:last,
          avg,
          spike: diff
        });

        console.log("🚨 ANOMALY:", part, supplier, last);
      }
    }
  }

  save("./data/anomalies.json", alerts);
}

setInterval(detect, 10000);
