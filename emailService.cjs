const fs = require("fs");
const { google } = require("googleapis");

function loadJSON(path) {
  try { return JSON.parse(fs.readFileSync(path)); }
  catch { return null; }
}

async function checkMail() {

  try {

    const creds = loadJSON("./gmail-credentials.json");
    const token = loadJSON("./gmail-token.json");

    if (!creds || !token) {
      console.log("❌ Missing Gmail credentials or token");
      return;
    }

    const oAuth2 = new google.auth.OAuth2(
      creds.installed.client_id,
      creds.installed.client_secret,
      creds.installed.redirect_uris[0]
    );

    oAuth2.setCredentials(token);

    const gmail = google.gmail({ version: "v1", auth: oAuth2 });

    const res = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread"
    });

    const count = res.data.resultSizeEstimate || 0;

    const output = {
      unread: count,
      lastChecked: new Date().toISOString()
    };

    fs.writeFileSync("./data/mailStatus.json", JSON.stringify(output, null, 2));

    console.log("📬 Unread emails:", count);

  } catch (err) {
    console.log("❌ Gmail error:", err.message);
  }
}

setInterval(checkMail, 20000);
checkMail();