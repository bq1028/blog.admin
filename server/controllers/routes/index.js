"use strict";

module.exports = async function () {
    this.body = await this.render("/index", {
        cn_module: "后台",
        env: process.env.ENV
    });
};