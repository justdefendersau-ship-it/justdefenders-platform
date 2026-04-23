import fs from "fs";

export async function GET(req){

  try{
    const url = new URL(req.url);
    const part = url.searchParams.get("part");

    const file = "C:/dev/justdefenders/data/price_history.json";

    if (!fs.existsSync(file)) return Response.json([]);

    const data = JSON.parse(fs.readFileSync(file));

    const filtered = data
      .filter(r => r.partNumber === part)
      .slice(-50); // last 50 points

    return Response.json(filtered);

  }catch{
    return Response.json([]);
  }
}
