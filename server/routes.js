/**
 * 路由设置
 * @author Philip
 */
"use strict"

const path = require('path')
const Router = require("koa-router")
const render = require('koa-ejs')
const { secured } = require('./service/secure')

module.exports = (app) => {
    let router = new Router()

    router.get("/", secured, async (ctx, next) => {
        await ctx.render('index');
    })
    
    app.use(router.routes())
}
