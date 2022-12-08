"use strict ";

const http = require("http");
const express = require("express");
const res = require("express/lib/response");

const app = express();

const port = 3000;
const host = "localhost";

const server = http.createServer(app);

app.get("/", (req, res) => res.send("<h1> hellow world </h1>"));

server.listen(port, host, () => console.log("server is listening "));
