/**
 * 内容
 * @author Philip
 */
const Dto = require('./Dto')
const contentDao = require('../daos/content')

class ContentDto extends Dto {
    constructor (contentDao) {
        super(contentDao)
    }
}

module.exports = new ContentDto(contentDao)
