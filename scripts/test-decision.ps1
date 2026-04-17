Write-Host "=== TEST DECISION ENGINE ==="
node -e "
const e=require('./backend/engines/decisionEngine.cjs');
const d=[
{partNumber:'LR1234',supplier:'Repco',price:120},
{partNumber:'LR1234',supplier:'Repco',price:125},
{partNumber:'LR1234',supplier:'Britpart',price:130},
{partNumber:'LR1234',supplier:'Britpart',price:128}
];
console.log(e.decideBestSupplier(d));
"
