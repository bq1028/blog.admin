/**
 * 内容
 * @author Philip
 */
const Dto = require('./Dto')
const contentDao = require('../daos/content')

class ContentDto extends Dto {}

module.exports = new ContentDto(contentDao)