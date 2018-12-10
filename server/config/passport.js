/**
 * 登录状态校验
 * @author Philip 
 */
"use strict"

const LocalStrategy = require("passport-local").Strategy
const authenticator = require("../libs/authenticator")
const user = require('../models/schemas/user')

const serialize = function (user, done) {
    done(null, user.id)
}

const deserialize = function (id, done) {
    user.findById(id).then(function (data) {
        done(null, data)
    })
}

module.exports = function (passport, config) {
    passport.serializeUser(serialize)
    passport.deserializeUser(deserialize)
    passport.use(new LocalStrategy(authenticator.localUser))
}
