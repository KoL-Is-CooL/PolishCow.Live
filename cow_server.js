  GNU nano 8.4                                          cow_server.js
const http = require("http");
const { frames } = require("./cow_frames");

const PORT = 80;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let i = 0;
  const interval = setInterval(() => {
    res.write("\033[H\033[J");  //Clear the terminal
    res.write(frames[i % frames.length] + "\n");
    i++;
  }, 100); //speed ajust (100ms = 10 FPS)

  req.on("close", () => clearInterval(interval));
}).listen(PORT, () => console.log(`Moo Moo runnin on ${PORT}!`));
