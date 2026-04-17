const fs = require("fs");

function load(p){ try{return JSON.parse(fs.readFileSync(p));}catch{return{}} }
function save(p,d){ fs.writeFileSync(p,JSON.stringify(d,null,2)); }

function recommend() {

  let predictions = load("./data/predictions.json");
  let rankings = load("./data/supplierScores.json");

  let output = {};

  for (let part in predictions) {

    output[part] = {};

    for (let supplier in predictions[part]) {

      let pred = predictions[part][supplier].predicted;
      let current = predictions[part][supplier].last;

      let trend = pred - current;

      let decision = "HOLD";

      if (trend > 5) decision = "BUY NOW";
      else if (trend < -5) decision = "WAIT";

      output[part][supplier] = {
        current,
        predicted: pred,
        trend,
        supplierScore: rankings[supplier] || 0,
        decision
      };
    }
  }

  save("./data/recommendations.json", output);

  console.log("🧠 Recommendations updated");
}

setInterval(recommend, 20000);
