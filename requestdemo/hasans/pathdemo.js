const http = require("http");
const { host, port } = require("./config.json");
const server = http.createServer((req, res) => {
  const { searchParams } = new URL(`http://${req.headers.host}${req.url}`);
  let name = searchParams.has("name") ? searchParams.get("name") : "";
  let messgae = "unrecognsied";
  if (name === "abida") {
    messgae = `hellow ${name}`;
  } else if (name === "ilhaan") {
    messgae = ` hellow ${name} i love you `;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1> ${messgae} </h1>`);
});

server.listen(port, host, () => console.log(`${host}:${port} is serving.....`));
