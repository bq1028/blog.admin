/**
 * 权限 控制器
 * @author Philip
 */
const Controller = require("./controller")
const authorityDto = require('../dto/authority')

class Authority extends Controller {}

module.exports = new Authority(authorityDto)
