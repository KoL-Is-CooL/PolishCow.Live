const http = require("http");
const fs = require("fs");
const { frames } = require("./cow_frames");

const PORT = 8080;
const GITHUB_URL = "https://github.com/KoL-Is-CooL/PolishCow.Live";
const logStream = fs.createWriteStream("access.log", { flags: "a" });

http
  .createServer((req, res) => {
    const ip = req.socket.remoteAddress;
    const ua = req.headers["user-agent"] || "";
    const now = new Date().toISOString();
    logStream.write(`[${now}] ${ip} ${ua}\n`);

    // redirect ppl on browsers to the gihub
    //this took me WAY TO LONG TO FIGURE OUT
    if (/Mozilla|Chrome|Safari|Edge|Opera/i.test(ua)) {
      res.writeHead(302, { Location: GITHUB_URL });
      res.end();
      return;
    }

    // terminal -> cow animation
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Connection": "keep-alive",
      "Transfer-Encoding": "chunked",
    });

    let i = 0;
    const FRAME_DELAY = 100;

    const interval = setInterval(() => {
      if (i >= frames.length) i = 0;
      res.write("\x1b[2J\x1b[H" + frames[i] + "\n");
      res.flush?.();
      i++;
    }, FRAME_DELAY);

    req.on("close", () => clearInterval(interval));
  })
  .listen(PORT, () =>
    console.log(`MOO MOO ON ${PORT}!`) //Hey! You Have Just Found Bob! Say hi to him! (If your seeing this DM me on discord!@king_of_lemons) Well Done!!!! Bob ---> :D
  );
