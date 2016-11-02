/**
 * 基础数据
 * @author Philip
 */

"use strict";

var user = require('./schemas/user');
var role = require('./schemas/role');
var auth = require('./schemas/auth');
var tag = require('./schemas/tag');

module.exports.init = function() {
    var arr = [
        user.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                username: 'admin',
                password: 'youcanguess',
                nick: '菲利普',
                mobile: '18305933239',
                email: 'wowcxy2008@126.com',
                avatar: null,
                birth: new Date('1990-03-21 06:06:06'),
                description: null,
                tags: [],
                role_id: '1'
            }
        })               
    ]

    Promise.all(arr).then(function() {
        console.log('==================== >>> base date inited <<< ====================');
    },function() {
        console.log(arguments);
    });
};