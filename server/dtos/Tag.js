/**
 * 标签
 * @author Philip
 */
const Dto = require('./Dto')
const tagDao = require('../daos/tag')

class TagDto extends Dto {}

module.exports = new TagDto(tagDao)