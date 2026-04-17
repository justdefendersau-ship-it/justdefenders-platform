const fs = require("fs");

const ALERT_FILE = "./data/intelligence.json";

function load(){
  try { return JSON.parse(fs.readFileSync(ALERT_FILE)); }
  catch { return {}; }
}

function run(){

  const data = load();

  if(!data.anomalies) return;

  data.anomalies.forEach(a=>{
    console.log("EMAIL ALERT:", a.part, a.type, a.value);
  });

}

setInterval(run,10000);
run();