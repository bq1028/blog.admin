/**
 * apis
 * @authro Philip
 */

"use strict"
const express = require("express")
const apis = require("./config/apis")
const { secured } = require("./services/secure")
const api = express.Router()

api.use(async function (ctx, next) {
    ctx.type = "json"
    await next()
})

Object.keys(apis).forEach((moduleName) => {
    let controller = require(`./controllers/${moduleName}`)
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

module.exports = api
