//
// File: backend/alertService.cjs
// JustDefenders ©
// Phase 5L — Alert engine with notifications
//

const fs = require("fs");
const { sendEmail, sendSMS } = require('./notificationService.cjs');

const ALERT_FILE = "./backend/alerts.json";

function loadAlerts() {
    try {
        return JSON.parse(fs.readFileSync(ALERT_FILE));
    } catch {
        return {};
    }
}

function saveAlerts(alerts) {
    fs.writeFileSync(ALERT_FILE, JSON.stringify(alerts, null, 2));
}

function addAlert(partNumber, targetPrice) {

    const alerts = loadAlerts();

    alerts[partNumber] = {
        targetPrice
    };

    saveAlerts(alerts);

    console.log("✔ Alert added:", partNumber, targetPrice);
}

function checkAlerts(partNumber, suppliers) {

    const alerts = loadAlerts();

    if (!alerts[partNumber]) return;

    const target = alerts[partNumber].targetPrice;

    const valid = suppliers.filter(s => s.price_aud !== undefined);

    if (valid.length === 0) return;

    const lowest = Math.min(...valid.map(s => s.price_aud));

    if (lowest <= target) {

        const message = `
PRICE ALERT 🚨
Part: ${partNumber}
Target: ${target}
Current: ${lowest}
        `;

        console.log(message);

        sendEmail("Price Alert Triggered", message);
        sendSMS(message);
    }
}

module.exports = { addAlert, checkAlerts };