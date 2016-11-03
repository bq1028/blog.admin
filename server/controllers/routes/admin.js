"use strict";

module.exports = function *() {
    this.body = yield this.render("/index", {
        cn_module: "后台",
        env: process.env.ENV
    });
};