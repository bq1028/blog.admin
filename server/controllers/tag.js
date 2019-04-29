/**
 * 标签
 * @author Philip
 */
const Controller = require("./Controller")
const tagDto = require('../dtos/tag')

class TagController extends Controller {
    constructor (tagDto) {
        super(tagDto)
    }
}

module.exports = new TagController(tagDto)
