const fs = require("fs");

function load(p){ try{return JSON.parse(fs.readFileSync(p));}catch{return{}} }
function save(p,d){ fs.writeFileSync(p,JSON.stringify(d,null,2)); }

function rank() {

  let history = load("./data/priceHistory.json");
  let scores = {};

  for (let part in history) {
    for (let supplier in history[part]) {

      let arr = history[part][supplier];
      if (arr.length < 3) continue;

      let avg = arr.reduce((a,b)=>a+b.price,0)/arr.length;
      let volatility = Math.max(...arr.map(x=>x.price)) - Math.min(...arr.map(x=>x.price));

      let score = 100 - avg - volatility;

      if (!scores[supplier]) scores[supplier]=[];
      scores[supplier].push(score);
    }
  }

  let final = {};

  for (let s in scores) {
    final[s] = scores[s].reduce((a,b)=>a+b,0)/scores[s].length;
  }

  save("./data/supplierScores.json", final);
  console.log("🏆 Rankings updated");
}

setInterval(rank, 15000);
