/**
 * 内容
 * @author Philip
 */
const Controller = require("./Controller")
const contentDto = require('../dtos/content')

class ContentController extends Controller {
    constructor (contentDto) {
        super(contentDto)
    }
}

module.exports = new ContentController(contentDto)
