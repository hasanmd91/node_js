const { CODES, MESSAGES } = require("./statusCodes");

const {
  getAllFlower,
  getOneFlower,
  addflower,
} = require("./firstlayerStorage");

module.exports = class FlowerStorage {
  getCodes() {
    return CODES;
  }
  //get all flower
  getAll() {
    return getAllFlower();
  }
  // get one flower from the storage
  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("---empty---"));
      } else {
        const result = await getOneFlower(id);
        console.log(`nothing found ${result}`);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  }
  // add new flwoer to the storage

  Addflower(newFlower) {
    return new Promise(async (resolve, reject) => {
      if (newFlower) {
        if (!newFlower.flowerId) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneFlower(newFlower.flowerId)) {
          reject(MESSAGES.ALREADY_IN_USE(newFlower.flowerId));
        } else if (await addflower(newFlower)) {
          resolve(MESSAGES.INSERT_OK(newFlower.flowerId));
        } else {
          reject(MESSAGES.NOT_INSERTED);
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }
};
