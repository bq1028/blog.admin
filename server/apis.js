/**
 * apis
 * @authro Philip
 */

"use strict"
const Router = require('koa-router')
const apis = require('./config/apis')

module.exports = async (app, passport) => { 
    let api = new Router()

    api.use(async function (next) {
        this.type = "json"
        await next()
    })

    Object.keys(apis).forEach((moduleName) => {
        let controller = require(`./controller/${moduleName}`)
        let module = apis[moduleName]

        Object.keys(module).forEach((handler) => {
            let api = module[handler].split(' ')
            let method = api[0]
            let url = api[1]
            
            router[method](url, secured, async (ctx, next) => {
                await controller[handler](ctx, next);
            })
        })
    })
};
