'use strict';

const path = require('path');

const { key,adapterFile, storageFile } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');

const storageFilePath= path.join(__dirname,storageFile)

const {adapt} =require(path.join(__dirname,adapterFile));

// console.log(storageFilePath)

async function getAllFromStorage(){
    return readStorage(storageFilePath);
}

async function getFromStorage(id){
    return (await readStorage(storageFilePath)).find(item=>item[key]==id) || null;
}

async function addToStorage(newObject){
    const storageData = await readStorage(storageFilePath);
    storageData.push(adapt(newObject));
    return await writeStorage(storageFilePath,storageData)
}

async function updateStorage(modifiedObject){
    const storageData = await readStorage(storageFilePath);
    const oldObject = storageData.find(item => item[key] ==modifiedObject[key]);
    if(oldObject){
        Object.assign(oldObject, adapt(modifiedObject));
        return await writeStorage(storageFilePath,storageData);
    }
    return false;
}

async function removeFromStorage(id){
    const storageData = await readStorage(storageFilePath);
    const i = storageData.findIndex(item=>item[key]==id);
    if(i<0) return false;
    storageData.splice(i,1);
    return await writeStorage(storageFilePath, storageData);
}


module.exports = {
    getAllFromStorage, 
    getFromStorage, 
    addToStorage, 
    updateStorage, 
    removeFromStorage
}



//tests
// getAllFromStorage().then(console.log).catch(console.log)
// getFromStorage(2).then(console.log).catch(console.log)

// addToStorage({
//     "id": '100',
//     "firstname": "Leilax",
//     "lastname": "Hökkix",
//     "department": "ictx",
//     "salary": '4009'
// }).then(console.log).catch(console.log)

// updateStorage({
//     "id": 100,
//     "firstname": "Leila",
//     "lastname": "Hökki",
//     "department": "ict",
//     "salary": '400'
// }).then(console.log).catch(console.log)

// removeFromStorage(100).then(console.log).catch(console.log)