/**
 * 应用
 * @author Philip
 */

"use strict"
// koa
const Koa = require("koa")
const session = require("koa-session2")

// 配置项
const appConfig = require("./config/app")

// 中间件
const middleware = require("./middleware/common")

// session store
const RedisStore = require("./service/redis-store");

// 路由
const apis = require("./apis")
const routes = require("./routes")

const app = new Koa()

// 中间件
middleware(app, appConfig)

// session
app.use(session({
    store: new RedisStore()
}))

// Routes
routes(app)
apis(app)

// 数据库初始化
require("./sequelize/db")()

app.listen(appConfig.port)
