/** 
 * 中间件
 * @author Philip
 */

// 路径
const path = require("path")

// koa
const render = require('koa-ejs')
const logger = require("koa-logger")
const compress = require("koa-compress")
const errorHandler = require("koa-error")
const session = require("koa-generic-session")
const responseTime = require("koa-response-time")
const bodyParser = require("koa-bodyparser")

module.exports = function (app, config, passport) {
    if (!config.app.keys) {
        throw new Error("please add session secret key in the config file")
    }

    app.keys = config.app.keys

    if (config.app.env !== "test") {
        app.use(logger())
    }

    app.use(errorHandler())

    app.use(session({
        key: "blog.admin.sid"
    }))

    app.use(bodyParser())

    app.use(passport.initialize())
    app.use(passport.session())

    render(app, {
        root: path.join(__dirname, 'view'),
        layout: 'template',
        viewExt: 'html',
        cache: false,
        debug: true
    })

    app.use(compress())
    app.use(responseTime())
}
