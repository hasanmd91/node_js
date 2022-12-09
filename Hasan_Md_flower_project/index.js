const express = require("express");
const path = require("path");
const app = express();

const { port, host } = require("./serverConfig.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const FlowerStorage = require(path.join(
  __dirname,
  "storage",
  "secondLayerStorage"
));

const flowerStorage = new FlowerStorage();

const menuPath = path.join(__dirname, "menu.html");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

// rendering home page
app.get("/", (req, res) => {
  res.sendFile(menuPath);
});

// rendering all flower page
app.get("/all", (req, res) => {
  flowerStorage
    .getAll()
    .then((data) => res.render("allFlower", { result: data }));
});

// rendering one flower page
app.get("/getflower", (req, res) => {
  res.render("oneFlower", {
    title: "Get",
    header1: "Get",
    action: "/getflower",
  });
});

app.post("/getflower", (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.sendStatus(500);
  }
  const flowerId = req.body.id;
  flowerStorage
    .getOne(flowerId)
    .then((flower) => res.render("flowerPage", { result: flower }))
    .catch((error) => console.log(error));
});

// rendering add flower page

app.get("/inputform", (req, res) => {
  res.render("form", {
    title: "Add Flower",
    header1: "Add a new Flower",
    action: "/inputform",
    flowerId: { value: "", readonly: "" },
    name: { value: "", readonly: "" },
    unitPrice: { value: "", readonly: "" },
    farmer: { value: "", readonly: "" },
    stock: { value: "", readonly: "" },
  });
});

app.listen(port, host, () => console.log("server is listening "));
