"use strict";
const http = require("http");

const { port, host } = require("./config.json");
const server = http.createServer((req, res) => {
  let urlData = new URL(`http://${host}${port}${req.url}`); //createing url object url object has searh search params pathname
  const { pathname, search, searchParams } = urlData;
  res.writeHead(200, { "Content-type": "application/json" });
  res.write("hellow");
  res.end(JSON.stringify(urlData));
});

server.listen(port, host, () => console.log(` ${host}:${port} is serving...`));

// node .\hasans\reqDemo.js
