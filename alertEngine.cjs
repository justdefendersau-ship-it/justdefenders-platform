const fs = require("fs");

const ALERT_FILE = "./data/systemAlerts.json";
const LOG_FILE = "./data/systemLogs.json";

function load(file){
  try { return JSON.parse(fs.readFileSync(file)); }
  catch { return []; }
}

function save(file,data){
  fs.writeFileSync(file, JSON.stringify(data,null,2));
}

function getSeverity(log){

  if(log.includes("ERROR")) return "CRITICAL";
  if(log.includes("ANOMALY")) return "WARNING";
  return "INFO";
}

function checkAlerts(){

  const logs = load(LOG_FILE);
  let alerts = load(ALERT_FILE);

  const recent = logs.slice(-20);

  recent.forEach(l => {

    if(l.includes("ERROR") || l.includes("ANOMALY")){

      if(!alerts.find(a => a.msg === l)){
        alerts.push({
          msg: l,
          severity: getSeverity(l),
          timestamp: new Date().toISOString()
        });
      }

    }

  });

  if(alerts.length > 100) alerts = alerts.slice(-100);

  save(ALERT_FILE, alerts);
}

setInterval(checkAlerts, 5000);
checkAlerts();