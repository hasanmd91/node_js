# person Api

## person.json

```json
  { "firstname": "Matt", "lastname": "River", "age": 30 },
  { "firstname": "Jesse", "lastname": "River", "age": 30 },
  { "firstname": "Marry", "lastname": "River", "age": 30 }


```

## data layer for persons

## function **search(key,value)**

function returns an array of person objects. search criterion is passed to the function as parameters. if parameters are missing, all persons will be returned

- search() returns an array of all persons
- serch(key, value) returns an array of all matching persons

if no match is found an empty array is returned

## server usage

## search all persons

http://localhost:3000/persons

##search by firstname
