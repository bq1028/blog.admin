/**
 * 路由设置
 * @author Philip
 */
"use strict"

const Router = require("koa-router")

// 控制器
const index = require("../controllers/routes/index")
const login = require("../controllers/routes/login")

const secured = async function (ctx, next) {
    if (ctx.isAuthenticated()) {
        await next ()
    } else {
        ctx.redirect('/login')
    }
}

const unsecured = async function (ctx, next) {
    if (!ctx.isAuthenticated()) {
        await next ()
    } else {
        ctx.redirect('/')
    }
}

module.exports = function (app, passport) {
    let router = new Router();

    router.get("/", secured, async function (ctx, next) {
        ctx.type = "html"
        await index.apply(ctx)
    })
    
    router.get(["/journal", "/user", "/content", "/authority"], secured, async function (ctx, next) {
        ctx.type = "html"
        await index.apply(ctx)
    })

    router.get("/login", unsecured, async function (ctx, next) {
        ctx.type = "html"
        await login.apply(ctx)
    })

    router.get("/logout", secured, async function (ctx, next) {
        ctx.session = null
        ctx.redirect('/login')
    })

    app.use(router.routes())
}
