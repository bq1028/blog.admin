/**
 * 标签
 * @author Philip
 */
const Controller = require("./controller")
const tagDto = require('../dtos/Tag')

class TagController extends Controller {
    constructor (tagDto) {
        super(tagDto)
    }
}

module.exports = new TagController(tagDto)
