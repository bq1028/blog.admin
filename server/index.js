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
const apis = require("./config/apis")
const config = require("./config/config")
const passport = require("./config/passport")
const middleware = require("./config/middleware")

// 路由
const routes = require("./routes")

// 数据库初始化
require("./models/db")()

var app = new Koa()

// Logger
app.use(logger())

// 中间件
passport(koaPassport, config)
middleware(app, config, koaPassport)

// Routes
routes(app, koaPassport)
api(app, koaPassport)

app.listen(config.app.port)
