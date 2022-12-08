const path = require("path");

const { storageFile, adapterFile, key } = require("./flowerstorageConfig.json");

const { readStorage, writeStorage } = require("./readWrite");

const storageFilePath = path.join(__dirname, storageFile);
const adapterFilePath = path.join(__dirname, adapterFile);

async function getAllFlower() {
  return readStorage(storageFilePath);
}

async function getOneFlower(id) {
  return await readStorage(storageFilePath).find(
    (item) => item[key] === id || null
  );
}
