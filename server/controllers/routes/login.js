"use strict";

module.exports = async function () {
    this.body = await this.render("/login", {
        cn_module: "登陆",
        env: process.env.ENV
    });
};