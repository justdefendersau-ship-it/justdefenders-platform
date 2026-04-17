const fs = require("fs");

const DATA_FILE = "./data/price_history.json";
const OUTPUT_FILE = "./data/intelligence.json";

function load(file){
  try { return JSON.parse(fs.readFileSync(file)); }
  catch { return []; }
}

function save(data){
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data,null,2));
}

function analyse(){

  const data = load(DATA_FILE);

  let trends = {};
  let anomalies = [];
  let suppliers = {};

  data.forEach(r => {

    const key = r.partNumber;

    // TREND
    if(!trends[key]) trends[key] = [];
    trends[key].push(r.price);

    // SUPPLIER
    if(!suppliers[r.supplier]) suppliers[r.supplier] = [];
    suppliers[r.supplier].push(r.price);
  });

  // DETECT SPIKES
  Object.entries(trends).forEach(([part,prices])=>{
    if(prices.length < 5) return;

    const avg = prices.reduce((a,b)=>a+b,0)/prices.length;
    const latest = prices[prices.length-1];

    if(latest > avg * 1.5){
      anomalies.push({
        part,
        type:"PRICE_SPIKE",
        value:latest,
        avg
      });
    }
  });

  // SUPPLIER RANKING
  let ranking = Object.entries(suppliers).map(([s,prices])=>{
    const avg = prices.reduce((a,b)=>a+b,0)/prices.length;
    return {supplier:s, avg};
  });

  ranking.sort((a,b)=>a.avg - b.avg);

  save({
    anomalies: anomalies.slice(-10),
    ranking: ranking.slice(0,10)
  });

}

setInterval(analyse,5000);
analyse();