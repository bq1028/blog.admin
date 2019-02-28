/**
 * redis cache
 * @author Philip
 */
const redis = require("redis")
const config = require("../config/app")
const client = redis.createClient(config.redis)

/**
 * 保存用户
 * @param {string}
 * @param {}
 */
exports.storeUser = () => {

}

exports.findUser = () => {

}