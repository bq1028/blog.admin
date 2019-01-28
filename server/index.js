/**
 * 应用
 * @author Philip
 */

"use strict"

// 基本库类
const path = require("path")
const fs = require("fs")

// koa
const Koa = require("koa")
const logger = require("koa-logger")
const koaPassport = require("koa-passport")

// 配置项
const config = require("./config")
const passport = require("./services/passport")
const middleware = require("./middlewares/common")

// 路由
const routes = require("./routes")
const apis = require("./apis")

// 数据库初始化
require("./sequelize/db")()

var app = new Koa()

// Logger
app.use(logger())

// 中间件
passport(koaPassport, config)
middleware(app, config, koaPassport)

// Routes
routes(app, koaPassport)
apis(app, koaPassport)

app.listen(config.app.port)
