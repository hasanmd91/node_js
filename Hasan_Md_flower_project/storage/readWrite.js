const fs = require("fs").promises;

async function readStorage(storagefile) {
  try {
    const data = await fs.readFile(storagefile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeStorage(storagefile, data) {
  try {
    await fs.writeFile(storagefile, JSON.stringify(data, null, 4), {
      encoding: "utf",
      flag: "w",
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { readStorage, writeStorage };
