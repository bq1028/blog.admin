"use strict";

module.exports = function *() {
    this.body = yield this.render("admin/index", {
        module: "admin",
        cn_module: "后台",
        env: process.env.ENV
    });
};