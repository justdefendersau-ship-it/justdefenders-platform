import fs from "fs";
import path from "path";
const engine = require("../../../lib/decisionEngine.cjs");
const HISTORY_FILE = path.join(process.cwd(),"../data/price_history.json");
function load(){
 if(!fs.existsSync(HISTORY_FILE)) return [];
 return JSON.parse(fs.readFileSync(HISTORY_FILE,"utf8"));
}
function group(data){
 const m={};
 data.forEach(d=>{
  if(!m[d.supplier]) m[d.supplier]=[];
  m[d.supplier].push(d);
 });
 return m;
}
export async function GET(req){
 const { searchParams } = new URL(req.url);
 const partNumber = searchParams.get("partNumber");
 if(!partNumber){
   return Response.json({error:"Missing partNumber"},{status:400});
 }
 const raw = load().filter(p=>p.partNumber===partNumber);
 if(!raw.length){
   return Response.json({error:"Not found"},{status:404});
 }
 const decision = engine.decideBestSupplier(raw);
 const grouped = group(raw);
 const suppliers = Object.keys(grouped).map(s=>({
   supplier:s,
   history:grouped[s]
 }));
 return Response.json({partNumber,decision,suppliers});
}
