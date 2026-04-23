const fs = require("fs");
const path = require("path");
const { log } = require("./logger.cjs");

const DATA_FILE = path.join(__dirname, "../data/price_history.json");

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

function load() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function addRecord(partNumber, supplier, price) {

  const data = load();

  const record = {
    partNumber,
    supplier,
    price,
    timestamp: new Date().toISOString()
  };

  data.push(record);
  save(data);

  log("info", `Harvested ${supplier} ${partNumber} $${price.toFixed(2)}`);
}

// RUN LOOP EVERY 5 SECONDS
setInterval(()=>{
  addRecord("LR1234","Repco",120 + Math.random()*10);
  addRecord("LR1234","Britpart",125 + Math.random()*10);
},5000);

log("info","Harvester started");