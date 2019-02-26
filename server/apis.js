/**
 * apis
 * @authro Philip
 */

"use strict"
const Router = require('koa-router')
const apis = require('config/apis')

module.exports = async (app, passport) => { 
    let api = new Router()

    api.use(async function (next) {
        this.type = "json"
        await next()
    })

    Object.keys(apis).forEach((name) => {
        let module = apis[name]
        let controller = require(`controller/${name}`)

        Object.keys(module).forEach((method) => {
            let um = module[method].split(' ')
            let method = um[0]
            let url = um[1]

            let handler = controller[method]

            api[method.toLowerCase()].call(api, [url, (req, res) => {
                handler(req, res)
            }])
        })
    })
};
