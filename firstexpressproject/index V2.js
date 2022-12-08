"use strict";

const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageTemplates"));

const { port, host } = require("./config.json");

const homepath = path.join(__dirname, "home.html");

const users = {
  matt: "secret",
  vera: "12345",
  jesse: "xyz",
};

app.get("/", (req, res) => res.sendFile(homepath));
app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const { username, password } = req.body;
  if (Object.keys(users).includes(username) && users[username] === password) {
    res.render("result", {
      title: "youe data",
      header: "you send these",
      data: { username, password },
    });
  } else {
    res.render("errorPage", { username });
  }

  app.get("/users", (req, res) =>
    res.render("users", {
      title: "Users",
      header,
    })
  );
});

app.listen(port, host, console.log("server is listening "));
