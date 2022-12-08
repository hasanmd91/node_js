const { CODES, MESSAGES } = require("./statusCodes");

const { getAllFlower, getOneFlower } = require("./firstlayerStorage");

module.exports = class FlowerStorage {
  getCodes() {
    return CODES;
  }

  getAll() {
    return getAllFlower();
  }

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
};
