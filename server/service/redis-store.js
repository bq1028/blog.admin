/**
 * redis 存储
 * @author Philip
 */
const redis = require("redis")
const bluebird = require('bluebird');
const { Store } = require("koa-session2");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const { host, port, password } = require("../config/redis")
const { session } = require("../config/app")

/**
 * redis 存储
 * @class
 */
class RedisStore extends Store {
    /**
     * @constructor
     */
    constructor () {
        super()
        
        this.redis = redis.createClient(port, host, {
            password
        })
    }
    
    /**
     * 根据 session id 获取 session
     * @param {string} sid
     * @return {string} session 
     */
    async get (sid) {
        return await this.redis.get(`SESSION:${sid}`)
    }
    
    /**
     * 设置 session
     * @param {string} session
     * @param {string} session id
     * @return {string} session id
     */
    async set (session, { sid = this.getID(24) } = {}) {
        try {
            await this.redis.set(`SESSION:${sid}`, session, 'EX', session.maxAge / 1000)
        } catch (e) {}

        return sid
    }

    /**
     * 销毁 session
     * @param {string} session id
     * @return {string} session id
     */
    async destroy (sid) {
        try {
            await this.redis.set(`SESSION:${sid}`, '')
        } catch (e) {}

        return sid
    }

    /**
     * 获取随即字串
     * @param {string} 随即字串长度
     * @return {string} 随机字串
     */
    getID (len) {
        len = len || 32
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        let maxPos = chars.length
        let pwd = ''

    　　for (i = 0; i < len; i++) {
    　　　　pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    　　}

    　　return pwd
    }
}
 
module.exports = RedisStore


