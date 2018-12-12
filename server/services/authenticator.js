/**
 * 切片模型
 * @author Philip
 */
"use strict"

const co = require("co")
const user = require("../dao/user")

exports.localUser = function (username, password, done) {
    co(async function () {
        try {
            return await user.findOne({ where: { username: username } })
        } catch(ex) {
            return null
        }
    }).then(function (data) {
        let info

        if (data !== null) {
            if (data.password !== password) {
                info = '密码不正确'
            }
        } else {
            info = '用户不存在'
        }
        
        done(null, data, info)
    })
}
