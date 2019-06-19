/**
 * 登陆中间件
 * @author Philip
 */
const request = require("request")

module.exports = async (req, res) => {
    let params = req.url.split("?")[0]
    let reg = /(B|b)ear/
    
    params = params.split("&")

    for (let i = 0, len = params.length; i < len; i ++) {
        let param = params[i]
        param = param.split("=")

        if (reg.test(param[0])) {
            ctx.session.refresh()

            let bear = param[1]
            let user = await request({
                url: 'http://raddeana.tech/api/bear',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    bear
                })
            })

            res.session.user = user
        }
    }
}
