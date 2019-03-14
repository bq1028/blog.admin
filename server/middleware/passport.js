/**
 * 登录状态校验
 * @author Philip 
 */
const passport = require('koa-passport')
const LocalStrategy = require("passport-local").Strategy
const auth = require("../service/auth")
const cache = require('./cache')

/**
 * 序列化
 * @param {object} 用户名 
 * @param {function} 序列化处理函数
 * @return none 
 */
const serialize = (user, done) => {
    done(null, user.id)
}

/**
 * 反序列化
 * @param {string} 反序列化 
 * @param {function} 序列化处理函数
 * @return {none}
 */
const deserialize = async (id, done) => {
    let user = await cache.findUser(id)

    if (user) {
        done(null, user)
    } else {
        done(new Error('用户未找到'))
    }
}

module.exports = (app, passport) => {
    passport.serializeUser(serialize)
    passport.deserializeUser(deserialize)

    app.use(passport.initialize())
    app.use(passport.session())
}
