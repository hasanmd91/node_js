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
  if (!req.body) {
    return res.sendStatus(500);
  }
  flowerStorage
    .getOne(req.body.id)
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

app.post("/inputform", (req, res) => {
  if (!req.body) {
    return res.statusCode(500);
  }
  flowerStorage
    .insertFlower(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

//update flower

//geting update form
app.get("/updateform", (req, res) => {
  res.render("form", {
    title: "update Flower",
    header1: "Update a Flower data",
    action: "/updatedata",
    flowerId: { value: "", readonly: "" },
    name: { value: "", readonly: "readonly" },
    unitPrice: { value: "", readonly: "readonly" },
    farmer: { value: "", readonly: "readonly" },
    stock: { value: "", readonly: "readonly" },
  });
});
// geting udated flower from database by id
app.post("/updatedata", (req, res) => {
  if (!req.body) {
    return res.sendStatus(500);
  }

  flowerStorage.getOne(req.body.flowerId).then((flower) =>
    res.render("form", {
      title: "update Flower",
      header1: "Update a Flower data",
      action: "/update",
      flowerId: { value: flower.flowerId, readonly: "readonly" },
      name: { value: flower.name, readonly: "" },
      unitPrice: { value: flower.unitPrice, readonly: "" },
      farmer: { value: flower.farmer, readonly: "" },
      stock: { value: flower.stock, readonly: "" },
    })
  );
});

app.post("/update", (req, res) => {
  if (!req.body) return res.statusCode(500);
  flowerStorage
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

//posting updated flower in the database

app.listen(port, host, () => console.log("server is listening "));

//helper functions
function sendErrorPage(res, error, title = "Error", header1 = "Error") {
  sendStatusPage(res, error, title, header1);
}

function sendStatusPage(res, status, title = "Status", header1 = "Status") {
  return res.render("statusPage", { title, header1, status });
}
