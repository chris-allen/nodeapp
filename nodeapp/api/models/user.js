'use strict';

import bcrypt from 'bcrypt';

module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('user', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password_digest: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, Infinity]
      }
    },
    password_confirmation: {
      type: Sequelize.VIRTUAL
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      authenticate: function(value) {
        if (bcrypt.compareSync(value, this.password_digest))
          return this;
        else
          return false;
      }
    }
  });

  var hasSecurePassword = function(user, options, callback) {
    if (user.password != user.password_confirmation) {
      throw new Error("Password confirmation doesn't match Password");
    }
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) return callback(err);
      user.set('password_digest', hash);
      return callback(null, options);
    });
  };

  User.beforeCreate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password)
      hasSecurePassword(user, options, callback);
    else
      return callback(null, options);
  })
  User.beforeUpdate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password)
      hasSecurePassword(user, options, callback);
    else
      return callback(null, options);
  })

  return User;
};