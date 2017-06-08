'use strict';

import passport from 'passport';
import jwt from 'jwt-simple';
const config = require('../config/config.json')['development'];

module.exports = function(app) {
    // Setup passport strategies
    require('./strategies');

    console.log("INIT");
    app.use(passport.initialize());

    function tokenForUser(user) {
        const timestamp = new Date().getTime();
        return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.secret_key);
    }

    app.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
        res.send({ token: tokenForUser(req.user)});
    });
};