"use strict";
var Router = require("koa-router");

var admin = require("../controllers/routes/admin");
var admin_login = require("../controllers/routes/admin_login");

var secured = function * (next) {
    if (this.isAuthenticated()) {
        yield next;
    } else {
        this.redirect('/login');
    }
};

var unsecured = function * (next) {
    if (!this.isAuthenticated()) {
        yield next;
    } else {
        this.redirect('/');
    }
};

module.exports = function (app, passport) {
    var router = new Router();

    router.get("/", secured, function *() {
        this.type = "html";
        yield admin.apply(this);
    });
    
    router.get("/login", unsecured, function *() {
        this.type = "html";
        yield admin_login.apply(this);
    });

    router.get("/logout", secured, function *() {
        this.session = null;
        this.status = 204;
        this.redirect('/login');
    });    

    app.use(router.routes());
};