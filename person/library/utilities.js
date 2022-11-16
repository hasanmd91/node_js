"use strict";

const fs = require("fs").promises;

async function sendFile(res, filepath, contentType = "text/html") {
  try {
    const data = await fs.readFile(filepath, "utf8");
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": Buffer.byteLength(data, "utf8"),
    });
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end(` Error : ${err.message}`);
  }
}

module.exports = { sendFile };
