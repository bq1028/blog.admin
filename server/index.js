/**
 * 应用
 * @author Philip
 */

"use strict"
// koa
const Koa = require("koa")

// 配置项
const config = require("./config/app")

// 中间件
const passport = require("./middleware/passport")
const middleware = require("./middleware/app")

// 路由
const apis = require("./apis")
const routes = require("./routes")

const app = new Koa()

// 中间件
passport(app, passport)
middleware(app, config)

// Routes
routes(app, passport)
apis(app, passport)

// 数据库初始化
require("./sequelize/db")()

app.listen(config.app.port)
