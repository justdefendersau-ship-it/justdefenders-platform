const fs = require("fs");

const LOG_FILE = "./data/systemLogs.json";

function log(msg){
  try{
    let logs = [];

    if(fs.existsSync(LOG_FILE)){
      logs = JSON.parse(fs.readFileSync(LOG_FILE));
    }

    const entry = "[" + new Date().toISOString() + "] [Crawler] " + msg;

    logs.push(entry);

    if(logs.length > 200) logs = logs.slice(-200);

    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  }catch(e){
    console.log("Log write failed:", e.message);
  }
}

function run(){

  setInterval(()=>{

    const part = "ERR5009";
    const supplier = "Britpart";
    const price = Math.floor(Math.random()*120);

    const msg = "Crawled " + part + " " + supplier + " $" + price;

    console.log(msg);
    log(msg);

  }, 4000);

}

console.log("Crawler running...");
log("Crawler started");

run();