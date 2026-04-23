import fs from "fs";

export async function GET() {
  const data = JSON.parse(fs.readFileSync("C:/dev/justdefenders/data/predictions.json"));
  return Response.json(data || {});
}
