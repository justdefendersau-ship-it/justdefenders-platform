const https = require("https");

function sendAlert(message) {

  const data = JSON.stringify({
    text: "🚨 JustDefenders Alert: " + message
  });

  const options = {
    hostname: "hooks.slack.com", // replace later
    path: "/services/YOUR/WEBHOOK",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = https.request(options);
  req.write(data);
  req.end();
}

module.exports = { sendAlert };
