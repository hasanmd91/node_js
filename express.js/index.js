"use strict ";

const express = require("express");
const res = require("express/lib/response");

const app = express();

const port = 3000;
const host = "localhost";

app.get("/", (req, res) => res.send("<h1> hellow world </h1>"));

app.listen(port, host, () => console.log("server is listening "));
