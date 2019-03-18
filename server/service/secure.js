/**
 * 权限需登录
 * @return {none}
 */
exports.secured = async function (ctx, next) {
    if (ctx.user) {
        await next()
    } else {
        ctx.status = 401
        ctx.body = {
            msg: '用户未登录'
        }
    }
}

/**
 * 权限需登录
 * @return {none}
 */
exports.securedRoute = async function (ctx, next) {
    if (!ctx.user) {
        await next()
    } else {
        ctx.redirect('http://raddeana.tech')
    }
}

/**
 * 权限无需登录
 * @return {none}
 */
exports.unsecured = async function (ctx, next) {
    if (!ctx.user) {
        await next()
    } else {
        ctx.status = 403
        
        ctx.body = {
            msg: '当前用户已授权'
        }
    }
}