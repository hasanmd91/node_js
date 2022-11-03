const http = require("http");

const url = require("url");
const { port, host } = require("./config.json");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end();
});

server.listen(port, host, () =>
  console.log(` ${host}: ${port} is running... `)
);
