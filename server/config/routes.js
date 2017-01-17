"use strict";
var Router = require("koa-router");

var index = require("../controllers/routes/index");
var login = require("../controllers/routes/login");

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
        yield index.apply(this);
    });
    
    router.get(["/journal", "/user", "/content", "/auth"], secured, function *() {
        this.type = "html";
        yield index.apply(this);
    });

    router.get("/login", unsecured, function *() {
        this.type = "html";
        yield login.apply(this);
    });

    router.get("/logout", secured, function *() {
        this.session = null;
        this.redirect('/login');
    });    

    app.use(router.routes());
};
