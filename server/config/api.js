"use strict";
var Router = require('koa-router');

var Restful = require('../libs/restful');
var common = require('../controllers/apis/common');

var authority = require('../models/schemas/authority');
var role = require('../models/schemas/role');
var tag = require('../models/schemas/tag');
var user = require('../models/schemas/user');
var journal = require('../models/schemas/journal');

/**
 * 权限需登录
 * @returns none
 */
var secured = async function (next) {
    if (this.isAuthenticated()) {
        await next;
    } else {
        this.status = 403;
    }
};

/**
 * 权限无需登录
 * @returns none
 */
var unsecured = async function (next) {
    if (!this.isAuthenticated()) {
        await next;
    } else {
        this.status = 403;
        
        this.body = {
            msg: '当前用户已授权'
        };
    }
};

module.exports = async function (app, passport) { 
    var api = new Router();

    api.use(async function (next) {
        this.type = "json";
        await next;
    }); 

    api.get("/logout", secured, common.logout);
    api.post("/api/login", unsecured, common.login);

    Restful.create('authority', authority, secured);
    Restful.create('tag', tag, secured);
    Restful.create('user', user, secured);
    Restful.create('role', role, secured);
    Restful.create('journal', journal, secured);

    app.use(api.routes());  
    app.use(Restful.api.routes());     
};