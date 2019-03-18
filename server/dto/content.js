/**
 * 内容 DTO
 * @author Philip
 */
const Dto = require('./dto')
const contentDao = require('../dao/content')

class ContentDto extends Dto {}

module.exports = new ContentDto(contentDao)