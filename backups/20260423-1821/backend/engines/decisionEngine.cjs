function groupBySupplier(data){
 const m={};data.forEach(x=>{if(!m[x.supplier])m[x.supplier]=[];m[x.supplier].push(x);});return m;}
function trend(p){if(p.length<2)return 0;return (p[p.length-1]-p[0])/p[0];}
function volatility(p){
 const avg=p.reduce((a,b)=>a+b,0)/p.length;
 const v=p.reduce((s,p)=>s+Math.pow(p-avg,2),0)/p.length;
 return Math.sqrt(v);
}
function decideBestSupplier(data){
 const g=groupBySupplier(data);
 let best=null;
 const breakdown=[];
 for(const s in g){
   const prices=g[s].map(x=>x.price);
   const latest=prices[prices.length-1];
   const t=trend(prices);
   const v=volatility(prices);
   const priceScore=(1/latest)*0.6;
   const trendScore=(1-Math.abs(t))*0.3;
   const volScore=(1/(1+v))*0.1;
   const total=priceScore+trendScore+volScore;
   const entry={
     supplier:s,
     price:latest,
     trend:t,
     volatility:v,
     score:total,
     breakdown:{
       priceScore,
       trendScore,
       volScore
     }
   };
   breakdown.push(entry);
   if(!best || total>best.score){best=entry;}
 }
 return {
   bestSupplier:best.supplier,
   price:best.price,
   trend:best.trend,
   volatility:best.volatility,
   confidence:best.score,
   breakdown
 };
}
module.exports={decideBestSupplier};
