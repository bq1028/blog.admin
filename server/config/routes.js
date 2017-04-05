"use strict";
var Router = require("koa-router");

var index = require("../controllers/routes/index");
var login = require("../controllers/routes/login");

var secured = async function (next) {
    if (this.isAuthenticated()) {
        await next;
    } else {
        this.redirect('/login');
    }
};

var unsecured = async function (next) {
    if (!this.isAuthenticated()) {
        await next;
    } else {
        this.redirect('/');
    }
};

module.exports = function (app, passport) {
    var router = new Router();

    router.get("/", secured, async function () {
        this.type = "html";
        await index.apply(this);
    });
    
    router.get(["/journal", "/user", "/content", "/authority"], secured, async function () {
        this.type = "html";
        await index.apply(this);
    });

    router.get("/login", unsecured, async function () {
        this.type = "html";
        await login.apply(this);
    });

    router.get("/logout", secured, async function () {
        this.session = null;
        this.redirect('/login');
    });    

    app.use(router.routes());
};
