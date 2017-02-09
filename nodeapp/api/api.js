'use strict';

var express = require('express');
var epilogue = require('epilogue');
var database = require('./models/index').sequelize;
var Sequelize = require('sequelize');
var User = require('./models/user')(database, Sequelize);

const API_SERVICE_PORT = 3003

var app = express();

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
});

// User REST resource
epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id']
});

app.listen(API_SERVICE_PORT, (error) => {
  if (error) {
    console.error(error.stack || error);
    throw error;
  }

  console.log(`Api server is listening at http://localhost:${API_SERVICE_PORT}`);
});