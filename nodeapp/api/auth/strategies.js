import passport  from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const LocalStrategy = require('passport-local').Strategy;
import { sequelize as database } from '../models/index'
import Sequelize from 'sequelize'
const config = require('../config/config.json')['development'];

const User = require('../models/user')(database, Sequelize);

// Create local strategy using email as the username
const localOptions = { usernameField: 'email', passwordField: 'password' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  
  User.findOne({ where: { email: email }}).then(user => {
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    if (user.authenticate(password)) {
      // if credentials are valid, invoke done() to supply Passport with the
      // user that authenticated.
      return done(null, user);
    }
    else {
      done(null, false);
    }
  });
});

// Create JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret_key
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);