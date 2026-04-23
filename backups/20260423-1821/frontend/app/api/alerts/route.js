import fs from "fs";

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync("C:/dev/justdefenders/data/systemAlerts.json"));
    return Response.json(data);
  } catch {
    return Response.json([]);
  }
}
