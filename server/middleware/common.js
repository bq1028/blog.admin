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
const responseTime = require("koa-response-time")

module.exports = function (app, config) {
    app.keys = config.keys

    if (config.env !== "develpo") {
        app.use(logger())
    }

    render(app, {
        root: path.join(__dirname, '../../dist/www'),
        layout: 'template',
        viewExt: 'html',
        cache: false,
        debug: true
    })

    app.use(errorHandler())
    app.use(compress())
    app.use(responseTime())
}
