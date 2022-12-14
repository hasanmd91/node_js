const path = require("path");

const { storageFile, adapterFile, key } = require("./flowerstorageConfig.json");

const { readStorage, writeStorage } = require("./readWrite");

const storageFilePath = path.join(__dirname, storageFile);
const { adapt } = require(path.join(__dirname, adapterFile));

async function getAllFlower() {
  console.log(adapt);
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
  console.log(updatedFlowerObject);
  const data = await readStorage(storageFilePath);
  const oldFlower = data.find((item) => item[key] === updatedFlowerObject[key]);
  if (oldFlower) {
    Object.assign(oldFlower, adapt(updatedFlowerObject));
    return await writeStorage(storageFilePath, oldFlower);
  }
}

module.exports = { getAllFlower, getOneFlower, addFlower, updateFlower };
