//
// File: backend/server.cjs
// JustDefenders ©
// Phase 5M — Web Dashboard Server
//

const express = require('express');
const fs = require('fs');
const { runPartsEngine } = require('./partsEngine.cjs');

const app = express();
app.use(express.json());

const PORT = 3000;

// ----------------------------------------------------------------------------------------------
// LOAD FILES
// ----------------------------------------------------------------------------------------------

function loadJSON(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch {
        return {};
    }
}

// ----------------------------------------------------------------------------------------------
// API: HISTORY
// ----------------------------------------------------------------------------------------------

app.get('/api/history', (req, res) => {
    const data = loadJSON('./backend/priceHistory.json');
    res.json(data);
});

// ----------------------------------------------------------------------------------------------
// API: ALERTS
// ----------------------------------------------------------------------------------------------

app.get('/api/alerts', (req, res) => {
    const data = loadJSON('./backend/alerts.json');
    res.json(data);
});

// ----------------------------------------------------------------------------------------------
// API: RUN SEARCH
// ----------------------------------------------------------------------------------------------

app.post('/api/run', async (req, res) => {

    const { partNumber } = req.body;

    if (!partNumber) {
        return res.status(400).json({ error: "Missing partNumber" });
    }

    const suppliers = await runPartsEngine(partNumber);

    res.json(suppliers);
});

// ----------------------------------------------------------------------------------------------
// FRONTEND
// ----------------------------------------------------------------------------------------------

app.get('/', (req, res) => {

    res.send(`
    <html>
    <head>
        <title>JustDefenders Dashboard</title>
        <style>
            body { font-family: Arial; padding: 20px; }
            input, button { padding: 10px; margin: 5px; }
            pre { background: #f4f4f4; padding: 10px; }
        </style>
    </head>
    <body>

        <h1>🚗 JustDefenders Dashboard</h1>

        <h2>Search Part</h2>
        <input id="part" placeholder="Enter part number" />
        <button onclick="runSearch()">Search</button>

        <h3>Results</h3>
        <pre id="results"></pre>

        <h2>Price History</h2>
        <button onclick="loadHistory()">Load History</button>
        <pre id="history"></pre>

        <h2>Alerts</h2>
        <button onclick="loadAlerts()">Load Alerts</button>
        <pre id="alerts"></pre>

        <script>
            async function runSearch() {
                const part = document.getElementById('part').value;

                const res = await fetch('/api/run', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ partNumber: part })
                });

                const data = await res.json();

                document.getElementById('results').innerText =
                    JSON.stringify(data, null, 2);
            }

            async function loadHistory() {
                const res = await fetch('/api/history');
                const data = await res.json();

                document.getElementById('history').innerText =
                    JSON.stringify(data, null, 2);
            }

            async function loadAlerts() {
                const res = await fetch('/api/alerts');
                const data = await res.json();

                document.getElementById('alerts').innerText =
                    JSON.stringify(data, null, 2);
            }
        </script>

    </body>
    </html>
    `);
});

// ----------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log("🚀 Dashboard running on http://localhost:" + PORT);
});