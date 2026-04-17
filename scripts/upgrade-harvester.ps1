Write-Host "=== UPGRADING HARVESTER ==="
$projectRoot = "C:\dev\justdefenders"
$backendPath = "$projectRoot\backend"
$utilsPath = "$backendPath\utils"

if (!(Test-Path $utilsPath)) {
    New-Item -ItemType Directory -Path $utilsPath | Out-Null
}

# normalise
$normalisePath = "$utilsPath\normalisePartData.cjs"
$n = @()
$n += 'function normalisePartData(raw) {'
$n += '    if (!raw) return null;'
$n += '    const partNumber = String(raw.partNumber || "").trim().toUpperCase();'
$n += '    const supplier = String(raw.supplier || "").trim();'
$n += '    const price = parseFloat(raw.price);'
$n += '    const timestamp = raw.timestamp || new Date().toISOString();'
$n += '    if (!partNumber || !supplier || isNaN(price)) return null;'
$n += '    return { partNumber, supplier, price, timestamp };'
$n += '}'
$n += 'module.exports = normalisePartData;'
Set-Content -Path $normalisePath -Value $n

# dedupe
$dedupePath = "$utilsPath\dedupeParts.cjs"
$d = @()
$d += 'function dedupeParts(data) {'
$d += '    const seen = new Set();'
$d += '    return data.filter(item => {'
$d += '        const key = `${item.partNumber}_${item.supplier}_${item.timestamp}`;'
$d += '        if (seen.has(key)) return false;'
$d += '        seen.add(key);'
$d += '        return true;'
$d += '    });'
$d += '}'
$d += 'module.exports = dedupeParts;'
Set-Content -Path $dedupePath -Value $d

# harvester
$harvesterPath = "$backendPath\harvester.cjs"
$h = @()
$h += 'const fs = require("fs");'
$h += 'const path = require("path");'
$h += 'const normalise = require("./utils/normalisePartData.cjs");'
$h += 'const dedupe = require("./utils/dedupeParts.cjs");'
$h += 'const HISTORY_FILE = path.join(__dirname, "../data/price_history.json");'
$h += 'const LOG_FILE = path.join(__dirname, "../logs/systemLogs.log");'
$h += 'function log(msg){fs.appendFileSync(LOG_FILE,new Date().toISOString()+" - "+msg+"\\n");}'
$h += 'function run(){'
$h += 'const raw=['
$h += '{ partNumber:" lr1234 ", supplier:"Repco", price:"120"},'
$h += '{ partNumber:"LR1234", supplier:"Repco", price:120},'
$h += '{ partNumber:"LR1234", supplier:"Britpart", price:130}'
$h += '];'
$h += 'const clean=raw.map(normalise).filter(Boolean);'
$h += 'const deduped=dedupe(clean);'
$h += 'let history=[];'
$h += 'if(fs.existsSync(HISTORY_FILE)){history=JSON.parse(fs.readFileSync(HISTORY_FILE,"utf8"));}'
$h += 'const updated=[...history,...deduped];'
$h += 'fs.writeFileSync(HISTORY_FILE,JSON.stringify(updated,null,2));'
$h += 'log("Processed "+deduped.length+" records");'
$h += '}'
$h += 'run();'
Set-Content -Path $harvesterPath -Value $h

Write-Host "UPGRADE COMPLETE"
