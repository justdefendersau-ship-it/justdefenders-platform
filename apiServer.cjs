const http = require("http");

let port = 4000;

function startServer(p) {

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("API running on port " + p);
  });

  server.listen(p, () => {
    console.log("✅ API running on port", p);
  });

  server.on("error", (err) => {

    if (err.code === "EADDRINUSE") {
      console.log("⚠️ Port", p, "in use, trying", p + 1);
      startServer(p + 1);
    } else {
      console.log("❌ Server error:", err.message);
    }

  });
}

startServer(port);