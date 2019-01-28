/**
 * apis
 * @authro Philip
 */

"use strict"
const Router = require('koa-router')

// ctrl and libs
const Restful = require('./services/restful')

// models
const tag = require('./dao/tag')
const role = require('./dao/role')
const user = require('./dao/user')
const journal = require('./dao/journal')
const authority = require('./dao/authority')

/**
 * 权限需登录
 * @returns none
 */
const secured = async function (next) {
    if (this.isAuthenticated()) {
        await next
    } else {
        this.status = 403
    }
}

/**
 * 权限无需登录
 * @returns none
 */
const unsecured = async function (next) {
    if (!this.isAuthenticated()) {
        await next
    } else {
        this.status = 403
        
        this.body = {
            msg: '当前用户已授权'
        }
    }
}

module.exports = async function (app, passport) { 
    let api = new Router()

    api.use(async function (next) {
        this.type = "json"
        await next()
    })

    app.use(api.routes())
    app.use(Restful.api.routes())
};
