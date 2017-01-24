'use strict';

var epilogue = require('epilogue');
var database = require('../models/index').sequelize;
var Sequelize = require('sequelize');
var User = require('../models/user')(database, Sequelize);

var api = {
  initialize: function(app) {
    if (!app)
        throw new Error('Please specify an app');

    // Initialize epilogue
    epilogue.initialize({
      app: app,
      sequelize: database
    });

    // User REST resource
    epilogue.resource({
      model: User,
      endpoints: ['/api/users', '/api/users/:id']
    });
  }
};

module.exports = api;