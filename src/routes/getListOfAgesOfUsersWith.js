'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    const { item } = request.query
    try {
      const data = await mockDBCalls.getListOfAgesOfUsersWith(item);
      return response.status(200).send(JSON.stringify(data));
    } catch(err) {
      console.log(err);
    }
    
    
};

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
};
