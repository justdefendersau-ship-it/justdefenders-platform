const fs = require("fs");

function load(p){ try{return JSON.parse(fs.readFileSync(p));}catch{return{}} }
function save(p,d){ fs.writeFileSync(p,JSON.stringify(d,null,2)); }

// PART TYPE DETECTION
function classify(part) {
  if (part.startsWith("LR")) return "OEM_NEW";
  if (part.startsWith("ERR")) return "OEM_LEGACY";
  if (part.startsWith("NRC")) return "OEM_CLASSIC";
  return "UNKNOWN";
}

// SIMPLE SUPERSESSION MAP (expand later)
const supersessionMap = {
  "ERR5009": "LR032644"
};

// IMAGE GENERATOR (SAFE)
function getImage(part) {
  return "https://via.placeholder.com/150?text=" + part;
}

function process() {

  let history = load("./data/priceHistory.json");
  let output = {};

  for (let part in history) {

    let canonical = supersessionMap[part] || part;

    output[canonical] = output[canonical] || {
      partNumber: canonical,
      type: classify(canonical),
      suppliers: {},
      image: getImage(canonical)
    };

    for (let supplier in history[part]) {

      let prices = history[part][supplier].map(x => x.price);

      output[canonical].suppliers[supplier] = {
        avg: Math.round(prices.reduce((a,b)=>a+b,0)/prices.length),
        min: Math.min(...prices),
        max: Math.max(...prices),
        last: prices[prices.length-1]
      };
    }
  }

  save("./data/oemCatalog.json", output);

  console.log("🔧 OEM intelligence updated");
}

setInterval(process, 15000);
process();