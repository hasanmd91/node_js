"use strict";

const path = require("path");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const homePath = path.join(__dirname, "home.html");
const pagebpath = path.join(__dirname, "pageB.html");

app.get("/", (req, res) => res.sendFile(homePath));
app.get("/pageb", (req, res) => res.sendFile(pagebpath));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, host, () => console.log("server is listening "));
