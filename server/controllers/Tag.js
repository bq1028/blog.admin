/**
 * 标签 控制器
 * @author Philip
 */
const Controller = require("./controller")
const tagDto = require('../dto/tag')

class Tag extends Controller {}

module.exports = new Tag(tagDto)
