/**
 * 标签 DTO
 * @author Philip
 */
const Dto = require('./dto')
const tagDao = require('../dao/tag')

class TagDto extends Dto {}

module.exports = new TagDto(tagDao)



