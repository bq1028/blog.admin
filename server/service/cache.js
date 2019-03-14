/**
 * redis cache
 * @author Philip
 */
const redis = require("redis")
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const { host, port, password } = require("../config/redis")
const client = redis.createClient(host, port, password)

/**
 * 保存用户
 * @param {string} user id
 * @param {object} user object
 * @return {boolean} store success or failure
 */
exports.storeUser = async (userId, user) => {
    await client.set(userId, JSON.stringify(user))
}

/**
 * 找到用户
 * @param {string} user id
 * @return {object} user
 */
exports.findUser = async () => {
    await client.get(userId)
}

