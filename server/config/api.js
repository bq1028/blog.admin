"use strict";
var Router = require('koa-router');

var Restful = require('../libs/restful');
var common = require('../controllers/apis/common');

var auth = require('../models/schemas/auth');
var role = require('../models/schemas/role');
var tag = require('../models/schemas/tag');
var user = require('../models/schemas/user');
var journal = require('../models/schemas/journal');

/**
 * 权限需登录
 * @returns none
 */
var secured = function * (next) {
    if (this.isAuthenticated()) {
        yield next;
    } else {
        this.status = 403;
    }
};

/**
 * 权限无需登录
 * @returns none
 */
var unsecured = function * (next) {
    if (!this.isAuthenticated()) {
        yield next;
    } else {
        this.status = 404;
    }
};

module.exports = function (app, passport) { 
    var api = new Router();

    api.use(function * (next) {
        this.type = "json";
        yield next;
    }); 

    api.get("/logout", secured, common.logout);
    api.post("/api/login", unsecured, common.login);

    Restful.create('auth', auth, secured);
    Restful.create('tag', tag, secured);
    Restful.create('user', user, secured);
    Restful.create('role', role, secured);
    Restful.create('journal', journal, secured);

    app.use(api.routes());  
    app.use(Restful.api.routes());     
};