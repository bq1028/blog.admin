/**
 * 切片模型
 * @author Philip
 */
"use strict"
const cache = require("./cache")

/**
 * 权限需登录
 * @returns none
 */
exports.secured = async function (next) {
    if (this.isAuthenticated()) {
        await next()
    } else {
        this.status = 403
    }
}

/**
 * 权限无需登录
 * @returns none
 */
exports.unsecured = async function (next) {
    if (!this.isAuthenticated()) {
        await next()
    } else {
        this.status = 403
        
        this.body = {
            msg: '当前用户已授权'
        }
    }
}