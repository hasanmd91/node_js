const express = require("express");
const path = require("path");
const app = express();

const { port, host } = require("./serverConfig.json");

const menuPath = path.join(__dirname, "menu.html");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

// rendering home page
app.get("/", (req, res) => {
  res.sendFile(menuPath);
});

// rendering all flower page
app.get("/all", (req, res) => {
  res.render("allFlower");
});

// rendering one flower page
app.get("/getflower", (req, res) => {
  res.render("oneFlower");
});

// rendering add flower page

app.get("/inputform", (req, res) => {
  res.render("form");
});

app.listen(port, host, () => console.log("server is listening "));
