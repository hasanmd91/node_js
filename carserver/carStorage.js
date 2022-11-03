"use strict";

const cars = require("./cars.json");

function getAllCars() {
  return cars;
}

function getAllModels() {
  const models = [];
  for (const car of cars) {
    if (!models.includes(car.model)) {
      models.push(car.model);
    }
  }
  return models;
}

//another possible (bad, hard coded) implementation. this doesnt concern the caller. because the api is not changed

// function getAllmodels() {
//   return ["Fats gt", "Errare", "MBW"];
// }

function getCar(key, value) {
  const found = [];
  if (key && value) {
    for (const car of cars) {
      if (car[key] === value) {
        found.push(car);
      }
    }
  }
  return found;
}

module.exports = { getAllCars, getAllModels, getCar };
