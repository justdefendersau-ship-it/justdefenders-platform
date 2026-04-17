const fs = require("fs");

const DATA_FILE = "./data/price_history.json";
const OUT_FILE = "./data/predictions.json";

function load(){
  try { return JSON.parse(fs.readFileSync(DATA_FILE)); }
  catch { return []; }
}

function save(data){
  fs.writeFileSync(OUT_FILE, JSON.stringify(data,null,2));
}

function predict(){

  const data = load();
  let grouped = {};

  data.forEach(r=>{
    if(!grouped[r.partNumber]) grouped[r.partNumber] = [];
    grouped[r.partNumber].push(r.price);
  });

  let predictions = [];

  Object.entries(grouped).forEach(([part,prices])=>{
    if(prices.length < 5) return;

    const recent = prices.slice(-5);
    const avg = recent.reduce((a,b)=>a+b,0)/recent.length;

    predictions.push({
      part,
      predicted: Math.round(avg)
    });
  });

  save(predictions);
}

setInterval(predict,10000);
predict();