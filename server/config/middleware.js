/** 
 * 中间件
 * @author Philip
 */

"use strict"

const path = require("path")
const serve = require("koa-static")
const session = require("koa-generic-session")
const responseTime = require("koa-response-time")
const logger = require("koa-logger")
const views = require("co-views")
const compress = require("koa-compress")
const errorHandler = require("koa-error")
const bodyParser = require("koa-bodyparser")

const STATIC_FILES_MAP = {}
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 }

module.exports = function(app, config, passport) {
    if (!config.app.keys) {
        throw new Error("Please add session secret key in the config file!")
    }

    app.keys = config.app.keys

    if (config.app.env !== "test") {
        app.use(logger())
    }

    app.use(errorHandler())
    
    app.use(serve(path.join(__dirname, '../../assets/develop')))
    app.use(serve(path.join(__dirname, '../../resources')))

    app.use(session({
        key: "blog.admin.sid"
    }))

    app.use(bodyParser())

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(async (ctx, next) => {
        var memory = config.app.env === "development" ? "memory": false

        ctx.render = views(config.app.root.replace('server', '') + "/views", {
            map: {
                html: "swig"
            },
            cache: memory
        })

        await next()
    });   

    app.use(compress())
    app.use(responseTime())
}
