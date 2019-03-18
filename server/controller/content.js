/**
 * 内容 控制器
 * @author Philip
 */
const Controller = require("./controller")
const contentDto = require('../dto/content')

class Content extends Controller {}

module.exports = new Content(contentDto)