"use strict";
var Router = require("koa-router");

var index = require("../controllers/routes/index");
var login = require("../controllers/routes/login");

var secured = async function (ctx, next) {
    if (ctx.isAuthenticated()) {
        await next ();
    } else {
        ctx.redirect('/login');
    }
};

var unsecured = async function (ctx, next) {
    if (!ctx.isAuthenticated()) {
        await next ();
    } else {
        ctx.redirect('/');
    }
};

module.exports = function (app, passport) {
    var router = new Router();

    router.get("/", secured, async function (ctx, next) {
        ctx.type = "html";
        await index.apply(ctx);
    });
    
    router.get(["/journal", "/user", "/content", "/authority"], secured, async function (ctx, next) {
        ctx.type = "html";
        await index.apply(ctx);
    });

    router.get("/login", unsecured, async function (ctx, next) {
        ctx.type = "html";
        await login.apply(ctx);
    });

    router.get("/logout", secured, async function (ctx, next) {
        ctx.session = null;
        ctx.redirect('/login');
    });    

    app.use(router.routes());
};
