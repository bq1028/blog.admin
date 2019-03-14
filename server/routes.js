/**
 * 路由设置
 * @author Philip
 */
"use strict"

const path = require('path')
const Router = require("koa-router")
const render = require('koa-ejs')
const { secured } = require('./service/auth')
const apis = require('./config/apis')

module.exports = (app) => {
    let router = new Router()

    router.get("/", secured, async (ctx, next) => {
        await ctx.render('index');
    })

    Object.keys(apis).forEach((moduleName) => {
        const controller = require(`./controller/${key}`)
        const module = apis[moduleName]

        Object.keys(module).forEach((handler) => {
            const api = module[handler].split(' ')
            const method = api[0]
            const url = api[1]
            
            controller[handler](url, secured, async (ctx, next) => {
                await controller[handler](ctx, next);
            })
        })
    })
    
    app.use(router.routes())
}
