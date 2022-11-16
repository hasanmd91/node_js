"use strict";

const persons = require("./person.json");

function search(key, value) {
  if (key && value) {
    const found = [];
    for (let person of persons) {
      if (person[key] === value) {
        found.push(person);
      }
    }
    return found;
  } else {
    return persons;
  }
}

module.export = { search };
