"use strict";

const http = require("http");
const { json } = require("stream/consumers");
const cars = require("./carstorage");
const { host, port } = require("./config.json");

const server = http.createServer((req, res) => {
  const { searchParams } = new URL(`http://${req.headers.host}${req.url}`);

  let name = searchParams.has("name") ? searchParams.get("name") : "";

  if (name === "getAllcars") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(` <h1> ${JSON.stringify(cars.getAllcars())} </h1> `);
  } else {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(` <h1> no cars to show </h1> `);
  }
});

server.listen(port, host, console.log(" server is listening "));
