"use strict";

const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageTemplates"));

const { port, host } = require("./config.json");

const homepath = path.join(__dirname, "home.html");

app.get("/", (req, res) => res.sendFile(homepath));
app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  // console.log(req.body);
  res.render("result", {
    title: "youe data",
    header: "you send these",
    data: req.body,
  });
});

app.listen(port, host, console.log("server is listening "));
