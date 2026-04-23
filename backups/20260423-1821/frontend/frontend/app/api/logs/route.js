import fs from "fs";
import path from "path";

export async function GET(){

  const file = path.join(process.cwd(),"../data/system.log");

  if(!fs.existsSync(file)){
    return Response.json([]);
  }

  const lines = fs.readFileSync(file,"utf8")
    .split("\n")
    .filter(Boolean)
    .slice(-200);

  return Response.json(lines);
}