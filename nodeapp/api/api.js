'use strict';

import express from 'express'
import epilogue from 'epilogue'
import { sequelize as database } from './models/index'
import bodyParser from 'body-parser';

import Log from 'log'
const log = new Log('info')

const API_SERVICE_PORT = 3003

var app = express();

app.use(bodyParser.json({ type: '*/*' }));

// User login / signup
require('./auth/index.js')(app)

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
});

// User CRUD
require('./user.js')(epilogue)

app.listen(API_SERVICE_PORT, (error) => {
  if (error) {
    log.error(error.stack || error);
    throw error;
  }

  log.info(`Api server is listening at http://localhost:${API_SERVICE_PORT}`);
});
