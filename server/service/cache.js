/**
 * redis cache
 * @author Philip
 */
const redis = require("redis")
const { host, port, password } = require("../config/redis")
const client = redis.createClient(host, port, password)

/**
 * 保存用户
 * @param {string}
 * @param {}
 */
exports.storeUser = () => {

}

exports.findUser = () => {

}
