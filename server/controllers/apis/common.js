/**
 * 登陆接口
 * @author Philip
 */

"use strict";

var fs = require('fs');
var passport = require("koa-passport");
var path = require('path');
var parse = require('co-busboy');
var os = require('os');

exports.login = async function (ctx) {
    var _this = ctx;

    await passport.authenticate("local", async function (err, user, info) {
        if (err) {
            throw err;
        }

        if (!user) {
            _this.status = 401;

            _this.body = {
                msg: info
            };
        } else {
            await _this.login(user.dataValues);

            _this.body = {
                user: user
            };
        }

    }).call(ctx);
};

exports.logout = async function () {
    this.session = null;
    this.status = 204;
};

exports.getCurrentUser = async function () {
    if (this.passport.user) {
        this.body = {
            user: this.passport.user
        };
    }

    this.status = 200;
};

exports.upload = async function (next) {
    var parts = parse(this);
    var part;

    var params = [];
    var name, ext, type, url;

    while (part = await parts) {
        if(part.pipe) {
            var _path = path.resolve('resources/' + name);
            var stream = fs.createWriteStream(_path);
            part.pipe(stream);
        } else {
            if(part[0] === 'name') {
                name = part[1];
                url = '/' + name;
            }

            if(part[0] === 'type') {
                var arr = part[1].split('/');

                ext = arr[1];
                type = arr[0];
            }

            params.push(params);
        }
    }

    var file = await fileModel.create({
        name: name,
        type: type,
        ext: ext,
        url: url
    });
    
    this.body = {
        msg: '上传文件成功',
        id: file.dataValues.id,
        type: type,
        ext: ext,        
        url: url
    };
};

exports.upload_remove = async function () {
    var file = await fileModel.destroy({
        where: {
            id: this.params.id
        }
    });

    this.body = {
        msg: '删除文件成功'
    };
};
