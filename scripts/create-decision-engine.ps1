Write-Host "=== BUILDING DECISION ENGINE ==="
$enginePath = "C:\dev\justdefenders\backend\engines"

if (!(Test-Path $enginePath)) {
    New-Item -ItemType Directory -Path $enginePath | Out-Null
}

$file = "$enginePath\decisionEngine.cjs"
$c = @()
$c += 'function groupBySupplier(data){'
$c += 'const m={};data.forEach(x=>{if(!m[x.supplier])m[x.supplier]=[];m[x.supplier].push(x);});return m;}'
$c += 'function trend(p){if(p.length<2)return 0;return (p[p.length-1]-p[0])/p[0];}'
$c += 'function volatility(p){const a=p.reduce((x,y)=>x+y,0)/p.length;const v=p.reduce((s,n)=>s+Math.pow(n-a,2),0)/p.length;return Math.sqrt(v);}'
$c += 'function decideBestSupplier(data){'
$c += 'const g=groupBySupplier(data);let b=null;'
$c += 'for(const s in g){const pr=g[s].map(x=>x.price);const l=pr[pr.length-1];const t=trend(pr);const v=volatility(pr);const sc=(1/l)*0.6+(1-Math.abs(t))*0.3+(1/(1+v))*0.1;if(!b||sc>b.score){b={supplier:s,price:l,trend:t,volatility:v,score:sc};}}'
$c += 'return{bestSupplier:b.supplier,price:b.price,trend:b.trend,volatility:b.volatility,confidence:b.score};}'
$c += 'module.exports={decideBestSupplier};'
Set-Content -Path $file -Value $c
Write-Host "Decision engine built"
