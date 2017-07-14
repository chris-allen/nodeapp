'use strict';

import passport from 'passport';
import jwt from 'jwt-simple';
const config    = require('../../.config.json');

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
        return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.SECRET_KEY);
    }

    app.post('/login', passport.authenticate('local', { session: false }), function(req, res, next) {
        res.send({ token: tokenForUser(req.user), user: req.user});
    });

    app.post('/signup', function(req, res, next) {
        User.findOne({ where: { email: 'test' }}).then(user => {
            User.create({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            })
            .then(user => {
                res.send({ token: tokenForUser(user), user: user});
            })
            .catch(error => {
                if (error.hasOwnProperty('errors')) {
                    res.status(400).send({ message: JSON.stringify(error.errors)});
                }
                else if (error.hasOwnProperty('message')) {
                    res.status(400).send({ message: error.message });
                }
                else {
                    res.status(400).send({ message: 'There was a problem' });
                }
            });
        })
    });

    app.get('/me', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.send(req.user);
    });
};