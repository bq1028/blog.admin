/**
 * 切片模型
 * @author Philip
 */

"use strict";
var co = require("co");
var user = require("../models/schemas/user");

exports.localUser = function (username, password, done) {
    co(function * () {
        try {
            return yield user.findOne({ where: {username: username} });
        } catch(ex) {
            return null;
        }
    }).then(function (data) {

        var info;

        if(data !== null) {
            if(data.password !== password) {
                info = '密码不正确';
            }
        } else {
            info = '用户不存在';
        }        
        
        done(null, data, info);
    });
};
