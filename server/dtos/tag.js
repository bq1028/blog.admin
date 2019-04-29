/**
 * 标签
 * @author Philip
 */
const Dto = require('./Dto')
const tagDao = require('../daos/tag')

class TagDto extends Dto {
    constructor (tagDao) {
        super(tagDao)
    }
}

module.exports = new TagDto(tagDao)