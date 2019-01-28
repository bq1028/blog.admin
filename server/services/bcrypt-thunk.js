/**
 * 加密
 * @author Philip
 */

"use strict"

var bcrypt = require("bcrypt")

module.exports = bcrypt.hashSync
module.exports = bcrypt.compareSync
module.exports = bcrypt.genSaltSync
module.exports.getRounds = bcrypt.getRounds

/**
 * hash化
 * @returns {Promise} hash化promise对象
 */
module.exports.genSalt = function (rounds, ignore) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(rounds, ignore, function (err, salt) {
            if (err) {
                return reject(err)
            }
            
            return resolve(salt)
        })
    })
}

/**
 * hash化
 * @return {Promise} hash化promise对象
 */
module.exports.hash = function (data, salt) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(data, salt, function (err, hash) {
            if (err) {
                return reject(err)
            } 
            
            return resolve(hash)
        })
    })
}

/**
 * 校验hash化的值
 * @return {Promise} 校验的promise对象
 */
module.exports.compare = function (data, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(data, hash, function(err, matched) {
            if (err) {
                return reject(err)
            }
            
            return resolve(matched)
        })
    })
}
