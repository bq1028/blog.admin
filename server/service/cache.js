/**
 * redis cache
 * @author Philip
 */
const redis = require("redis")
const config = require("../config/app")
const client = redis.createClient(config.redis)

exports.user = () => {

}

exports.