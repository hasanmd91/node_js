const { CODES, MESSAGES } = require("./statusCodes");

const {
  getAllFlower,
  getOneFlower,
  addFlower,
} = require("./firstlayerStorage");

module.exports = class FlowerStorage {
  get CODES() {
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
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  }
  // add new flwoer to the storage

  insertFlower(newFlower) {
    console.log(newFlower);
    return new Promise(async (resolve, reject) => {
      if (newFlower) {
        if (!newFlower.flowerId) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneFlower(newFlower.flowerId)) {
          reject(MESSAGES.ALREADY_IN_USE(newFlower.flowerId));
        } else if (await addFlower(newFlower)) {
          resolve(MESSAGES.INSERT_OK(newFlower.flowerId));
        } else {
          reject(MESSAGES.NOT_INSERTED);
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update() {}
};
