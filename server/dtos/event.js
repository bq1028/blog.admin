/**
 * 事件
 * @author Philip
 */
const Dto = require('./Dto')
const eventDao = require('../daos/event')

class EventDto extends Dto {
    constructor (eventDao) {
        super(eventDao)
    }
}

module.exports = new EventDto(eventDao)