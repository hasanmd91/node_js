# Car storage API

## **getAllModels()**

return the names of all models in storage as an array of strings.
The name is added to the array only once. If nothin found, returns an empty array.

## **getCar(key, value)**
get all cars that matches the given key-value pair.
-   returns car objects in an array
-   if there is no match, an empty array is returned

### Example
```js
getCar('model','Fast GT');
getCar('licence','ABC-1');
```

## **getAllCars()**
returns all car objects in an array or an empty array