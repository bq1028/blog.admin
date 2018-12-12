/**
 * 路由设置
 * @author Philip
 */
"use strict"

const Router = require("koa-router")
const render = require('koa-ejs')

const secured = async function (ctx, next) {
    if (ctx.isAuthenticated()) {
        await next ()
    } else {
        ctx.redirect("/login")
    }
}

const unsecured = async function (ctx, next) {
    if (!ctx.isAuthenticated()) {
        await next ()
    } else {
        ctx.redirect("/")
    }
}

module.exports = function (app, passport) {
    let router = new Router()

    router.get("/", secured, async function (ctx, next) {
        await index.apply(ctx)
    })
    
    router.get(["/journal", "/user", "/content", "/authority"], secured, async function (ctx, next) {
        await index.apply(ctx)
    })

    router.get("/login", unsecured, async function (ctx, next) {
        await login.apply(ctx)
    })

    router.get("/logout", secured, async function (ctx, next) {
        ctx.redirect("/login")
    })

    render(app, {
        root: path.join(__dirname, '../web/dist'),
        layout: 'template',
        viewExt: 'html',
        cache: false,
        debug: true
    })

    app.use(views(__dirname, { map: {html: 'nunjucks' }}))
    app.use(router.routes())
}
