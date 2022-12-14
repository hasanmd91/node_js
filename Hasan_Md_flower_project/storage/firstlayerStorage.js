const path = require("path");

const { storageFile, adapterFile, key } = require("./flowerstorageConfig.json");

const { readStorage, writeStorage } = require("./readWrite");

const storageFilePath = path.join(__dirname, storageFile);
const { adapt } = require(path.join(__dirname, adapterFile));

async function getAllFlower() {
  return readStorage(storageFilePath);
}

async function getOneFlower(id) {
  return (await readStorage(storageFilePath)).find(
    (item) => item[key] == id || null
  );
}

async function addFlower(newFlowerObject) {
  const data = await readStorage(storageFilePath);
  data.push(adapt(newFlowerObject));
  return writeStorage(storageFilePath, data);
}

async function updateFlower(updatedFlowerObject) {
  const data = await readStorage(storageFilePath);
  const oldFlower = data.find((item) => item[key] == updatedFlowerObject[key]);
  if (oldFlower) {
    Object.assign(oldFlower, adapt(updatedFlowerObject));
    return await writeStorage(storageFilePath, data);
  }
}

async function removeFlower(flowerId) {
  const data = await readStorage(storageFilePath);
  const index = data.findIndex((obj) => obj[key] == flowerId);
  if (index < 0) return false;
  data.splice(index, 1);
  return await writeStorage(storageFilePath, data);
}

module.exports = {
  getAllFlower,
  getOneFlower,
  addFlower,
  updateFlower,
  removeFlower,
};
