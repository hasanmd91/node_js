const http = require("http");
const { port, host } = require("./config.json");
const server = http.createServer((req, res) => {
  const { searchParams } = new URL(`${req.headers.host}${req.url}`);

  let messgae = searchParams.has("name")
    ? searchParams.get("name")
    : "strangers";
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`hellow ${messgae}  `);
});

server.listen(port, host, () => console.log(`${host}:${port} is listening `));
