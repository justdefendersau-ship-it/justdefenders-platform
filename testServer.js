const http = require("http");

const PORT = 4000;

console.log("STARTING TEST SERVER...");

http.createServer((req, res) => {

  console.log("HIT:", req.url);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WORKING");

}).listen(PORT, () => {
  console.log("✅ TEST SERVER RUNNING ON PORT 4000");
});