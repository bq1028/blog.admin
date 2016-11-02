"use strict";
var LocalStrategy = require("passport-local").Strategy;
var authenticator = require("../libs/authenticator");
var user = require('../models/schemas/user')

var serialize = function(user, done) {
    done(null, user.id);
};

var deserialize = function(id, done) {
    user.findById(id).then(function(data) {
        done(null, data);
    });
};

module.exports = function(passport, config) {
    passport.serializeUser(serialize);
    passport.deserializeUser(deserialize);
    passport.use(new LocalStrategy(authenticator.localUser));
};