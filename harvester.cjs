
const fs = require("fs");
const HISTORY_FILE = "./data/price_history.json";

function saveHistory(record){
  try{
    let data = [];

    if(fs.existsSync(HISTORY_FILE)){
      data = JSON.parse(fs.readFileSync(HISTORY_FILE));
    }

    data.push(record);

    // keep last 500 records
    if(data.length > 500){
      data = data.slice(-500);
    }

    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data,null,2));

  }catch(e){
    console.log("History write error:", e.message);

saveHistory({
  partNumber: part,
  supplier: supplier,
  price: price,
  timestamp: new Date().toISOString()
});
  }
}
const fs = require("fs");

const LOG_FILE = "./data/systemLogs.log";

function log(msg){
  try{
    const entry = "[" + new Date().toISOString() + "] [Harvester] " + msg + "\n";
    fs.appendFileSync(LOG_FILE, entry);
  }catch{}
}

setInterval(()=>{
  const msg = "Processed NRC9448 $" + Math.floor(Math.random()*100);
  console.log(msg);

saveHistory({
  partNumber: part,
  supplier: supplier,
  price: price,
  timestamp: new Date().toISOString()
});
  log(msg);
},3000);

console.log("Harvester running...");

saveHistory({
  partNumber: part,
  supplier: supplier,
  price: price,
  timestamp: new Date().toISOString()
});
log("Harvester started");