/**
 * 权限需登录
 * @return {none}
 */
exports.secured = async function (req, res) {
    if (!req.session.user) {
        res.sendStatus(401)
        res.json({
            msg: '用户未登录'
        })
    }
}

/**
 * 权限需登录
 * @return {none}
 */
exports.securedRoute = async function (req, res) {
    if (!req.session.user) {
        res.redirect('http://raddeana.tech')
    }
}

/**
 * 权限无需登录
 * @return {none}
 */
exports.unsecured = async function (req, res) {
    if (req.session.user) {
        res.sendStatus(403)
        res.json({
            msg: '当前用户已授权'
        })
    }
}