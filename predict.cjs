const fs = require("fs");

function load(p){ try{return JSON.parse(fs.readFileSync(p));}catch{return{}} }
function save(p,d){ fs.writeFileSync(p,JSON.stringify(d,null,2)); }

function predict() {

  let history = load("./data/priceHistory.json");
  let output = {};

  for (let part in history) {
    output[part] = {};

    for (let supplier in history[part]) {

      let arr = history[part][supplier];
      if (arr.length < 5) continue;

      let recent = arr.slice(-5).map(x=>x.price);
      let avg = recent.reduce((a,b)=>a+b,0)/recent.length;

      output[part][supplier] = {
        predicted: Math.round(avg),
        last: arr[arr.length-1].price
      };
    }
  }

  save("./data/predictions.json", output);
  console.log("🔮 Predictions updated");
}

setInterval(predict, 20000);
