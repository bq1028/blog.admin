/**
 * 标签
 * @author Philip
 */
const Controller = require("./controller")
const tagDto = require('../dtos/Tag')

class TagController extends Controller {}

module.exports = new TagController(tagDto)
