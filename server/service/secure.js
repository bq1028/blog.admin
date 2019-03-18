/**
 * 权限需登录
 * @return {none}
 */
exports.secured = async function (req, res) {
    if (req.session.user) {
        await next()
    } else {
        req.status = 401
        req.body = {
            msg: '用户未登录'
        }
    }
}

/**
 * 权限需登录
 * @return {none}
 */
exports.securedRoute = async function (req, res) {
    if (req.session.user) {
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
    if (!req.session.user) {
        await next()
    } else {
        req.status = 403
        
        req.body = {
            msg: '当前用户已授权'
        }
    }
}