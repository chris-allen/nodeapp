'use strict';

import { sequelize as database } from './models/index'
import Sequelize from 'sequelize'
const User = require('./models/user')(database, Sequelize);

module.exports = function(epilogue) {
  // User REST resource
  epilogue.resource({
    model: User,
    endpoints: ['/users', '/users/:id']
  });
}