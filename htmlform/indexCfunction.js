"use strict";

const http = require("http");
const path = require("path");
const fs = require("fs");
const { port, host } = require("./config.json");

const homepath = path.join(__dirname, "home.html");
const pageApath = path.join(__dirname, "pageA.html");

const server = http.createServer((req, res) => {
  const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
  const route = decodeURIComponent(pathname);
  if (route === "/") {
    sendFile(res, homepath);
  } else if (route === "/pageA") {
    sendFile(res, pageApath);
  } else if (route.startsWith("/styles")) {
    sendFile(res, path.join(__dirname, route), "text/css");
  } else {
    res.statusCode = 404;
    res.end("Error: page not found");
  }
});

async function sendFile(res, filepath, contentType = "text/html") {
  try {
    const data = await fs.promises.readFile(filepath, "utf8");
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": Buffer.byteLength(data, "utf8"),
    });
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end(` Error : ${err.message}`);
  }
}

server.listen(port, host, () => console.log(`server is running `));
