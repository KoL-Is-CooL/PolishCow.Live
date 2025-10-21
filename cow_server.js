const http = require("http");
const fs = require("fs");
const { frames } = require("./cow_frames");

const PORT = 80;
const GITHUB_URL = "https://github.com/KoL-Is-CooL/PolishCow.Live";
const logStream = fs.createWriteStream("access.log", { flags: "a" });

http.createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  const ua = req.headers["user-agent"] || "";
  const now = new Date().toISOString();
  logStream.write(`[${now}] ${ip} ${ua}\n`);

  // If the user searches polishcow.live in a web browser then redirect them to github
  if (/Mozilla|Chrome|Safari|Edge|Opera/i.test(ua)) {
    res.writeHead(302, { Location: GITHUB_URL });
    res.end();
    return;
  }

  // Stuff that happens if a user curls it in a terminal
  res.writeHead(200, { "Content-Type": "text/plain" });
  let i = 0;
  const interval = setInterval(() => {
    res.write("\x1Bc");
    res.write(frames[i % frames.length] + "\n");
    i++;
  }, 100);

  req.on("close", () => clearInterval(interval));
}).listen(PORT, () =>
  console.log(`Moo Moo server running on port ${PORT}!`)
);

