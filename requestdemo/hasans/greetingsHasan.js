"use strict";

const http = require("http");
const { url } = require("inspector");
const { port, host } = require("./config.json");
const server = http.createServer((req, res) => {
  const { searchParams } = new URL(`http://${req.headers.host}${req.url}`);
  if (searchParams.has("name")) {
    const name = searchParams.get("name");
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(` <h1>hellow mr ${name} </h1>`);
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(` <h1> hello strangers  </h1>`);
  }
});

server.listen(port, host, () =>
  console.log(`${host}:${port} is listening... `)
);

// node .\hasans\reqDemo.js
