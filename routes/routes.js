var express = require('express');
var router = express.Router();

const giphinateHandler = require('../lib/handlers/giphinate'),
      insertItem = require('../lib/handlers/insert'),
      deleteItem = require('../lib/handlers/delete'),
      getItem = require('../lib/handlers/get');

module.exports = function(app, passport) {

    // API GET
    app.get('/:queryText', giphinateHandler);

    // API GET specific Gif from Db
    app.get('/gif/:queryText', getItem);

    // API INSERT
    app.post('/:queryText', insertItem);

    // API DELETE
    app.delete('/:queryText', deleteItem);
};
