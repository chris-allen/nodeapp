'use strict';

import express from 'express'
import epilogue from 'epilogue'
import { sequelize as database } from './models/index'
import Sequelize from 'sequelize'
import Log from 'log'

var User = require('./models/user')(database, Sequelize);

const log = new Log('info')

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
    log.error(error.stack || error);
    throw error;
  }

  log.info(`Api server is listening at http://localhost:${API_SERVICE_PORT}`);
});
