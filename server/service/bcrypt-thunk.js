/**
 * 加密
 * @author Philip
 */

"use strict"

const bcrypt = require("bcrypt")

exports.hashSync = bcrypt.hashSync
exports.getRounds = bcrypt.getRounds
exports.compareSync = bcrypt.compareSync
exports.genSaltSync = bcrypt.genSaltSync

/**
 * 生成盐值
 * @param {unknow} the cost of processing the data
 * @param {unknow}  minor version of bcrypt to use
 * @return {promise} promise对象
 */
exports.genSalt = async (rounds, minor) => {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(rounds, minor, function (err, salt) {
            if (err) {
                return reject(err)
            }
            
            return resolve(salt)
        })
    })
}

/**
 * hash化
 * @param {unknow} the data to be encrypted
 * @param {unknow} the salt to be used to hash the password
 * @return {promise} promise对象
 */
exports.hash = async (data, salt) => {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(data, salt, function (err, encrypted) {
            if (err) {
                return reject(err)
            } 
            
            return resolve(encrypted)
        })
    })
}

/**
 * 比较值是否一致
 * @param {unknow} data to compare
 * @param {unknow} data to be compared to
 * @return {promise} promise对象
 */
exports.compare = async (data, encrypted) => {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(data, encrypted, function(err, same) {
            if (err) {
                return reject(err)
            }
            
            return resolve(same)
        })
    })
}
