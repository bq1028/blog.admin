/**
 * apis
 * @authro Philip
 */

"use strict"
const Router = require('koa-router')
const apis = require('./config/apis')
const { secured } = require('./service/secure') 


/**
 * 
 * @param {koa} koa 实例
 * @return none
 */
module.exports = async (app) => { 
    let api = new Router()

    api.use(async function (next) {
        this.type = "json"
        await next()
    })

    Object.keys(apis).forEach((moduleName) => {
        let controller = require(`./controller/${moduleName}`)
        let module = apis[moduleName]

        Object.keys(module).forEach((handler) => {
            let apiConfig = module[handler].split(' ')
            let method = apiConfig[0].toLowerCase()
            let url = apiConfig[1]
            
            api[method](url, secured, async (ctx, next) => {
                await controller[handler](ctx, next);
            })
        })
    })
};
