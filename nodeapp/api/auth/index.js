'use strict';

import passport from 'passport';
import jwt from 'jwt-simple';
const config = require('../config/config.json')['development'];

import { sequelize as database } from '../models/index'
import Sequelize from 'sequelize'
const User = require('../models/user')(database, Sequelize);

module.exports = function(app) {
    // Setup passport strategies
    require('./passport_strategies');

    // Passport middleware
    app.use(passport.initialize());

    function tokenForUser(user) {
        const timestamp = new Date().getTime();
        return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.secret_key);
    }

    app.post('/login', passport.authenticate('local', { session: false }), function(req, res, next) {
        res.send({ token: tokenForUser(req.user), user: req.user});
    });

    app.post('/signup', function(req, res, next) {
        User.findOne({ where: { email: 'test' }}).then(user => {
            if (user) {
                res.status(400).send({ error: 'Email already in use' });
            }
            else {
                User.create({
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password,
                    password_confirmation: req.body.password_confirmation
                })
                .then(user => {
                    console.log('user: '+user);
                    res.send({ token: tokenForUser(user)});
                })
                .catch(error => {
                    if (error.hasOwnProperty('errors')) {
                        res.status(400).send(error.errors);
                    }
                    else if (error.hasOwnProperty('message')) {
                        res.status(400).send([ JSON.parse(error.message) ]);
                    }
                    else {
                        res.status(400).send([ { message: 'There was a problem' }]);
                    }
                });
            }
        })
    });

    app.get('/me', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.send(req.user);
    });
};