//
// File: backend/historyService.cjs
// JustDefenders ©
// Phase 5I — Price history tracking
//

const fs = require("fs");

const HISTORY_FILE = "./backend/priceHistory.json";

function loadHistory() {
    try {
        return JSON.parse(fs.readFileSync(HISTORY_FILE));
    } catch {
        return {};
    }
}

function saveHistory(history) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function recordPrices(partNumber, suppliers) {

    const history = loadHistory();

    if (!history[partNumber]) {
        history[partNumber] = [];
    }

    history[partNumber].push({
        timestamp: new Date().toISOString(),
        suppliers
    });

    saveHistory(history);
}

module.exports = { recordPrices };