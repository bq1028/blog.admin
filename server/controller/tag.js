/**
 * 标签
 * @author Philip
 */
const Controller = require("./controller")
const tagDto = require('../dto/tag')

class Tag extends Controller {}

module.exports = new Tag(tagDto)
