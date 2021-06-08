'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    let usersWithItem = [];
    const ageCounter = {};
    const ageCounterArray = [];
    for (let user in db.itemsOfUserByUsername) {
      if (db.itemsOfUserByUsername[user].includes(item)) {
        usersWithItem.push(user);
      }
    }
    const users = _.map(db.usersById, (userInfo) => userInfo);
    const usersInfoWithItem = users.filter((user) =>
      usersWithItem.includes(user.username)
    );
    usersInfoWithItem.forEach((user) => {
      if (ageCounter.hasOwnProperty(user.age)) {
        ageCounter[user.age] += 1;
      } else {
        ageCounter[user.age] = 1;
      }
    });
    for (let age in ageCounter) {
      let obj = {};
      obj["age"] = age;
      obj["count"] = ageCounter[age];
      ageCounterArray.push(obj);
    }
    console.log(ageCounterArray);
    return ageCounterArray;
  }
  return mockDBCall(dataAccessMethod);
}
const getItems = () => {
  const dataAccessMethod = () => {
    const itemSet = new Set();
    Object.values(db.itemsOfUserByUsername).forEach((arr) => {
      arr.forEach((element) => itemSet.add(element));
    });
    return Array.from(itemSet);
  };

  return mockDBCall(dataAccessMethod);
};
module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
  getItems
};
