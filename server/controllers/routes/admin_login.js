"use strict";

module.exports = function *() {
    this.body = yield this.render("/login", {
        module: "admin",
        cn_module: "登陆",
        env: process.env.ENV
    });
};