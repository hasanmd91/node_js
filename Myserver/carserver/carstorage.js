"use strict";

const cars = require("./cars.json");

const getAllcars = () => {
  return cars;
};

const getCarModels = () => {
  let models = [];
  for (let car of cars) {
    models.push(car.model);
  }
  return models;
};

const getCar = (key, value) => {
  let found = [];
  if (key && value) {
    for (let car of cars) {
      if (car[key] === value) {
        found.push(car);
      }
    }
  }
  return found;
};

module.exports = { getAllcars, getCarModels, getCar };
