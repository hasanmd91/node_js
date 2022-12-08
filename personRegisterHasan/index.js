const http = require("http");
const path = require("path");

const { sendfile } = require("./library/utilities");
const { search } = require("./storage/persondatalayer");

const port = process.env.port || 2000;
const host = process.env.port || "localhost";

const homepath = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(
    `http://${req.headers.host}${req.url}`
  );
  const route = decodeURIComponent(pathname);

  if (route === "/") {
    sendfile(res, homepath);
  } else if (route.startsWith("/styles/")) {
    sendfile(res, path.join(__dirname, route), "text/css");
  } else if (route.startsWith("/js/")) {
    sendfile(res, path.join(__dirname, route), "text/javascript");
  } else {
    let result = [];
    if (route === "/persons") {
      result = search();
    } else if (route === "/persons/firstname") {
      result = search("firstname", searchParams.get("value"));
    } else if (route === "/persons/lastname") {
      result = search("lastname", searchParams.get("value"));
    } else if (route === "/persons/age") {
      result = search("age", searchParams.get("value"));
    } else {
      result = { message: "key not found " };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  }
});

server.listen(port, host, () => console.log("server is listening..."));
