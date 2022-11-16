"use strict";

const http = require("http");
const path = require("path");
const fs = require("fs");
const { port, host } = require("./config.json");

const homepath = path.join(__dirname, "home.html");

const server = http.createServer((req, res) => {
  fs.readFile(homepath, "utf8", (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(err.message); //
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(data, "utf8"),
      });
      res.end(data);
    }
  });
});

server.listen(port, host, () => console.log(`server is running `));
