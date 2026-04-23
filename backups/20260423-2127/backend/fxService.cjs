//
// File: backend/fxService.cjs
// JustDefenders ©
// Phase 5G — Live FX Rate Fetcher
//

const https = require('https');

function getGBPtoAUD() {

    return new Promise(resolve => {

        const url = "https://api.exchangerate.host/latest?base=GBP&symbols=AUD";

        https.get(url, res => {

            let data = "";

            res.on("data", chunk => data += chunk);

            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    const rate = json.rates.AUD;
                    resolve(rate || 1.9);
                } catch {
                    resolve(1.9);
                }
            });

        }).on("error", () => resolve(1.9));
    });
}

module.exports = { getGBPtoAUD };