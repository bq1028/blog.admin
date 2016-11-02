"use strict";
var Router = require("koa-router");

var Restful = require("../libs/restful");
var common = require("../controllers/apis/common");

var auth = require("../models/schemas/auth");
var file = require("../models/schemas/file");
var role = require("../models/schemas/role");
var tag = require("../models/schemas/tag");
var user = require("../models/schemas/user");
var content = require("../models/schemas/content");
var journal = require("../models/schemas/journal");
var message = require("../models/schemas/message");

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

    api.post('/api/file', secured, common.upload);
    api.delete('/api/file/:id', secured, common.upload_remove);

    Restful.create('auth', auth, secured);
    Restful.create('tag', tag, secured);
    Restful.create('user', user, secured);
    Restful.create('file', file, secured);
    Restful.create('role', role, secured);

    Restful.create('content', content, secured, {
        create: function (data) {
            var tags = data.tags;
            
            return function (content) {
                return content.setTags(tags);
            };
        },
        query: [ { model: tag, as: 'tags' }, { model: user, as: 'author' }, { model: auth, as: 'auth' } ],
        update: [ 'tags' ],
        remove: [ 'tags' ]
    });

    Restful.create('journal', journal, secured);
    Restful.create('message', message, secured);

    app.use(api.routes());  
    app.use(Restful.api.routes());     
};