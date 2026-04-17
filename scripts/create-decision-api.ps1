Write-Host "=== BUILDING DECISION API ==="
$apiPath = "C:\dev\justdefenders\pages\api"

if (!(Test-Path $apiPath)) {
    New-Item -ItemType Directory -Path $apiPath -Force | Out-Null
}

$file = "$apiPath\decision.js"
$c = @()
$c += 'import fs from "fs";'
$c += 'import path from "path";'
$c += 'const engine = require("../../backend/engines/decisionEngine.cjs");'
$c += 'const HISTORY_FILE = path.join(process.cwd(),"data/price_history.json");'
$c += 'function load(){'
$c += ' if(!fs.existsSync(HISTORY_FILE)) return [];'
$c += ' return JSON.parse(fs.readFileSync(HISTORY_FILE,"utf8"));'
$c += '}'
$c += 'export default function handler(req,res){'
$c += ' const partNumber=req.query.partNumber;'
$c += ' if(!partNumber){return res.status(400).json({error:"Missing partNumber"});}'
$c += ' const data=load().filter(p=>p.partNumber===partNumber);'
$c += ' if(!data.length){return res.status(404).json({error:"Not found"});}'
$c += ' const decision=engine.decideBestSupplier(data);'
$c += ' return res.status(200).json({partNumber,decision});'
$c += '}'
Set-Content -Path $file -Value $c
Write-Host "Decision API built"
