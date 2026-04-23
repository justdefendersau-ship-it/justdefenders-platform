//
// File: backend/priceHistory.cjs
// JustDefenders ©
// Phase 8B.1 — Safe Price History Engine
//

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "priceHistory.json");

function loadHistory() {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));

        // 🔥 ENSURE ARRAY
        if (!Array.isArray(data)) {
            return [];
        }

        return data;

    } catch {
        return [];
    }
}

function saveHistory(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function recordPrices(results) {

    if (!results || results.length === 0) return;

    let history = loadHistory();

    const timestamp = new Date().toISOString();

    for (const r of results) {

        history.push({
            partNumber: r.partNumber,
            supplier: r.supplier,
            price: r.price_aud,
            timestamp
        });
    }

    saveHistory(history);
}

module.exports = { recordPrices };