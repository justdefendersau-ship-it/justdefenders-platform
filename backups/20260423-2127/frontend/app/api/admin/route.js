import fs from "fs";
import { google } from "googleapis";

function load(p){
  try { return JSON.parse(fs.readFileSync(p)); }
  catch { return {}; }
}

async function getMailCount() {

  try {
    const creds = JSON.parse(fs.readFileSync("C:/dev/justdefenders/gmail-credentials.json"));
    const token = JSON.parse(fs.readFileSync("C:/dev/justdefenders/gmail-token.json"));

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

    return res.data.resultSizeEstimate || 0;

  } catch (err) {
    return -1;
  }
}

export async function GET() {

  const alerts = load("C:/dev/justdefenders/data/systemAlerts.json");
  const harvester = load("C:/dev/justdefenders/data/harvesterStatus.json");
  const anomalies = load("C:/dev/justdefenders/data/anomalies.json");

  let fileSizeMB = 0;

  try {
    const stats = fs.statSync("C:/dev/justdefenders/data/priceHistory.json");
    fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  } catch {}

  const mailUnread = await getMailCount();

  return Response.json({
    alerts,
    harvester,
    anomaliesCount: anomalies.length || 0,
    fileSizeMB,
    mailUnread
  });
}