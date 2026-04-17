import fs from "fs";

export async function GET() {
  const data = JSON.parse(fs.readFileSync("C:/dev/justdefenders/data/anomalies.json"));
  return Response.json(data || []);
}
