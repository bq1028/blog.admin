/**
 * 内容
 * @author Philip
 */
const Controller = require("./Controller")
const contentDto = require('../dtos/Content')

class ContentController extends Controller {}

module.exports = new ContentController(contentDto)