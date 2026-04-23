import fs from "fs";

export async function GET(req) {
  const name = new URL(req.url).searchParams.get("name");

  fs.writeFileSync("C:/dev/justdefenders/data/restartSignal.txt", name);

  return Response.json({ ok: true });
}
