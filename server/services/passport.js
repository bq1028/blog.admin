/**
 * 登录状态校验
 * @author Philip 
 */
const LocalStrategy = require("passport-local").Strategy
const authenticator = require("../services/authenticator")
const userDao = require('../dao/user')

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
 * @return none
 */
const deserialize = (id, done) => {
  userDao.findById(id).then((data) => {
    done(null, data)
  })
}

module.exports = (passport, config) => {
  passport.serializeUser(serialize)
  passport.deserializeUser(deserialize)
  passport.use(new LocalStrategy(authenticator.localUser))
}
